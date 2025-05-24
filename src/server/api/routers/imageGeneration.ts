import { generateImage } from "@/server/ai/generateImage";
import { prompt as promptTable } from "@/server/db/schema";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const imageGenerationRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.user.id;

        const dbPrompt = await ctx.db
          .insert(promptTable)
          .values({
            prompt: input.prompt,
            userId: userId,
          })
          .returning();

        generateImage(input.prompt, dbPrompt[0]?.id || "", userId);

        return dbPrompt;
      } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image");
      }
    }),
});
