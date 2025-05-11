import { env } from "@/env";
import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import { UTApi } from "uploadthing/server";
import { prompt } from "@/lib/utils";

export const utapi = new UTApi({});

const openai = new OpenAI({
  apiKey: env.OPEN_AI_API,
});

export const imageGenerationRouter = createTRPCRouter({
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const promptBuilder = prompt(input.prompt);

        // const result = await openai.images.generate({
        //   model: "gpt-image-1",
        //   promptBuilder,
        //   size: "1536x1024",
        //   quality: "medium",
        //   response_format: "b64_json",
        // });

        // console.log("response ====>", result);

        // if (result?.data?.[0]?.b64_json) {
        //   const image_base64 = result.data[0].b64_json;
        //   const image_bytes = Buffer.from(image_base64, "base64");
        //   fs.writeFileSync("otter.png", image_bytes);
        // }
        // Save the image to a file

        const img = await fs.promises.readFile("public/generated-image.png");
        const file = new File([img], "generated-image.png", {
          type: "image/png",
        });

        const response = await utapi.uploadFiles([file]);

        console.log("response ====>", response);

        // return result;
      } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image");
      }
    }),
});
