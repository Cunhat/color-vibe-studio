import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { book } from "@/server/db/schema";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(book).values(input);
    }),
  getBooks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.book.findMany();
  }),
});
