import { eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { prompt } from "@/server/db/schema";

export const promptRouter = createTRPCRouter({
  getPrompts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.prompt.findMany();
  }),
  getPromptById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.prompt.findFirst({
        where: eq(prompt.id, input.id),
        with: {
          images: {
            with: {
              image: true,
            },
          },
        },
      });
    }),
});
