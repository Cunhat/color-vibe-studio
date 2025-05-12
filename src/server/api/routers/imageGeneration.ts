import { env } from "@/env";
import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import { UTApi } from "uploadthing/server";
import { prompt } from "@/lib/utils";
import dayjs from "dayjs";
import { prompt as promptTable } from "@/server/db/schema";

export const utapi = new UTApi({});

const openai = new OpenAI({
  apiKey: env.OPEN_AI_API,
});

export const imageGenerationRouter = createTRPCRouter({
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const dbPrompt = await ctx.db
          .insert(promptTable)
          .values({
            prompt: input.prompt,
          })
          .returning();

        console.log("dbPrompt ====>", dbPrompt);

        return dbPrompt;

        // const promptBuilder = prompt(input.prompt);

        // console.log("promptBuilder ====>", promptBuilder);

        // const result = await openai.images.generate({
        //   model: "gpt-image-1",
        //   prompt: promptBuilder,
        //   size: "1536x1024",
        //   quality: "medium",
        //   // response_format: "b64_json",
        // });

        // console.log("response ====>", result);

        // if (result?.data?.[0]?.b64_json) {
        //   const image_base64 = result.data[0].b64_json;
        //   const image_bytes = Buffer.from(image_base64, "base64");
        //   const imgName = dayjs().millisecond();

        //   // Create a File object from the saved image
        //   const file = new File([image_bytes], `generated-${imgName}.png`, {
        //     type: "image/png",
        //   });

        //   // Upload to uploadthing
        //   const uploadImgResponse = await utapi.uploadFiles([file]);

        //   return uploadImgResponse;
        // }
      } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image");
      }
    }),
});
