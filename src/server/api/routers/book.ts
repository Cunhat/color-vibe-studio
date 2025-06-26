import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { book } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { desc } from "drizzle-orm";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(book).values({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
  getBooks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.book.findMany({
      where: eq(book.userId, ctx.session.user.id),
      with: {
        images: true,
      },
      orderBy: [desc(book.createdAt)],
    });
  }),
  getRecentBooks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.book.findMany({
      where: eq(book.userId, ctx.session.user.id),
      with: {
        images: true,
      },
      orderBy: [desc(book.createdAt)],
      limit: 3,
    });
  }),
  getBookById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.book.findFirst({
        where: and(eq(book.id, input.id), eq(book.userId, ctx.session.user.id)),
        with: {
          images: true,
        },
      });
    }),
});
