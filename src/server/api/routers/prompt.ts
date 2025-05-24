import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { prompt } from "@/server/db/schema";

export const promptRouter = createTRPCRouter({
  getPrompts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.prompt.findMany({
      where: eq(prompt.userId, ctx.user.id),
    });
  }),
  getPromptById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.prompt.findFirst({
        where: and(eq(prompt.id, input.id), eq(prompt.userId, ctx.user.id)),
        with: {
          image: true,
        },
      });
    }),
});
