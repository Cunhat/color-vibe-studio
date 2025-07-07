import z from "zod";
import { createTRPCRouter } from "../trpc";

import { protectedProcedure } from "../trpc";
import { and, desc, eq, inArray, lt, type InferSelectModel } from "drizzle-orm";
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
  getLastCommunityImages: protectedProcedure
    .input(
      z.object({
        cursor: z.date().nullish(),
        limit: z.number().min(1).max(20).default(4),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;

      const images = await ctx.db.query.image.findMany({
        with: {
          prompt: true,
        },
        limit: limit + 1,
        where: cursor ? lt(image.createdAt, cursor) : undefined,
        orderBy: [desc(image.createdAt)],
      });

      const hasMore = images.length > limit;

      const items = hasMore ? images.slice(0, -1) : images;
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore ? lastItem?.createdAt : undefined;

      return {
        images: items,
        nextCursor,
      };
    }),
});
