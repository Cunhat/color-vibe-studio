import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { book, bookImage } from "@/server/db/schema";
import { and, eq, inArray } from "drizzle-orm";
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
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input.id) {
        return await ctx.db.query.book.findMany({
          where: eq(book.userId, ctx.session.user.id),
          with: {
            images: true,
          },
        });
      }

      return await ctx.db.query.book.findFirst({
        where: and(eq(book.id, input.id), eq(book.userId, ctx.session.user.id)),
        with: {
          images: true,
        },
      });
    }),
  addImagesToBook: protectedProcedure
    .input(z.object({ bookId: z.string(), imageIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(bookImage)
        .where(
          and(
            eq(bookImage.userId, ctx.session.user.id),
            inArray(bookImage.imageId, input.imageIds),
          ),
        );

      await ctx.db.insert(bookImage).values(
        input.imageIds.map((imageId) => ({
          bookId: input.bookId,
          imageId,
          userId: ctx.session.user.id,
        })),
      );
    }),
});
