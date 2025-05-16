import "server-only";

import { OpenAI } from "openai";
import { prompt } from "@/lib/utils";
import dayjs from "dayjs";

import { env } from "@/env";
import { api } from "@/trpc/server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { image, promptImage, prompt as promptTable } from "@/server/db/schema";
import { UTApi } from "uploadthing/server";

const openai = new OpenAI({
  apiKey: env.OPEN_AI_API,
});

export const utapi = new UTApi({});

export async function generateImage(input: string, promptId: string) {
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

    if (uploadImgResponse[0]?.error) return;

    const imageUrl = uploadImgResponse[0]?.data?.ufsUrl;

    if (!imageUrl) return;

    const createImage = await db
      .insert(image)
      .values({
        url: imageUrl,
      })
      .returning();

    if (!createImage[0]?.id) return;

    const dbPrompt = await db.insert(promptImage).values({
      imageId: createImage[0]?.id,
      promptId: promptId,
    });

    const updatePrompt = await db
      .update(promptTable)
      .set({
        isReady: true,
      })
      .where(eq(promptTable.id, promptId));
  }
}
