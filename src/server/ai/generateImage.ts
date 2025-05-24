import "server-only";

import { OpenAI } from "openai";
import { prompt } from "@/lib/utils";
import dayjs from "dayjs";

import { env } from "@/env";
import { api } from "@/trpc/server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { image, prompt as promptTable } from "@/server/db/schema";
import { UTApi } from "uploadthing/server";

type Error = {
  error: { message: string; code: string; type: string; param: string };
};

const openai = new OpenAI({
  apiKey: env.OPEN_AI_API,
});

export const utapi = new UTApi({});

export async function generateImage(
  input: string,
  promptId: string,
  userId: string,
) {
  try {
    const promptBuilder = prompt(input);
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: promptBuilder,
      size: "1536x1024",
      quality: "medium",
    });

    if (result?.data?.[0]?.b64_json) {
      const image_base64 = result.data[0].b64_json;
      const image_bytes = Buffer.from(image_base64, "base64");
      const imgName = dayjs().millisecond();

      // Create a File object from the saved image
      const file = new File([image_bytes], `generated-${imgName}.png`, {
        type: "image/png",
      });

      //Upload to uploadthing
      const uploadImgResponse = await utapi.uploadFiles([file]);

      if (uploadImgResponse[0]?.error) {
        const errorMessage =
          uploadImgResponse[0]?.error?.message ??
          "We encountered an issue while generating your artwork. Please try again.";

        await db
          .update(promptTable)
          .set({
            isReady: true,
            isError: true,
            errorMessage,
          })
          .where(eq(promptTable.id, promptId));

        return;
      }

      const imageUrl = uploadImgResponse[0]?.data?.ufsUrl;

      if (!imageUrl) return;

      const createImage = await db
        .insert(image)
        .values({
          url: imageUrl,
          userId,
          promptId,
        })
        .returning();

      if (!createImage[0]?.id) return;

      await db
        .update(promptTable)
        .set({
          isReady: true,
          isError: false,
        })
        .where(eq(promptTable.id, promptId));
    }
  } catch (error) {
    const openAIError = error as Error;

    const errorMessage =
      openAIError?.error?.message ??
      "We encountered an issue while generating your artwork. Please try again.";

    await db
      .update(promptTable)
      .set({
        isReady: true,
        isError: true,
        errorMessage,
      })
      .where(eq(promptTable.id, promptId));

    return;
  }
}
