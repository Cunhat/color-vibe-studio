import { generateImage } from "@/server/ai/generateImage";
import { prompt as promptTable } from "@/server/db/schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

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

        generateImage(input.prompt, dbPrompt[0]?.id || "");

        return dbPrompt;
      } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image");
      }
    }),
});
