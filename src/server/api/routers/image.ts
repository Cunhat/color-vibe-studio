import z from "zod";
import { createTRPCRouter } from "../trpc";

import { protectedProcedure } from "../trpc";
import { and, desc, eq, inArray, type InferSelectModel } from "drizzle-orm";
import { image, prompt } from "@/server/db/schema";

export const imageRouter = createTRPCRouter({
  getImages: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.image.findMany({
      where: eq(image.userId, ctx.session.user.id),
      with: {
        prompt: true,
      },
      orderBy: [desc(image.createdAt)],
    });
  }),

  getRecentImages: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.image.findMany({
      where: eq(image.userId, ctx.session.user.id),
      with: {
        prompt: true,
      },
      orderBy: [desc(image.createdAt)],
      limit: 3,
    });
  }),
  deleteImages: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const imagesWithPrompts = await ctx.db.query.image.findMany({
        where: and(
          inArray(image.id, input),
          eq(image.userId, ctx.session.user.id),
        ),
        columns: {
          promptId: true,
        },
      });

      await ctx.db
        .delete(image)
        .where(
          and(inArray(image.id, input), eq(image.userId, ctx.session.user.id)),
        );

      const promptIds = imagesWithPrompts
        .map((img) => img.promptId)
        .filter((id): id is string => id !== null);

      if (promptIds.length > 0) {
        await ctx.db.delete(prompt).where(inArray(prompt.id, promptIds));
      }
    }),
});
