import z from "zod";
import { createTRPCRouter } from "../trpc";

import { protectedProcedure } from "../trpc";
import { desc, eq, type InferSelectModel } from "drizzle-orm";
import { image } from "@/server/db/schema";

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
});
