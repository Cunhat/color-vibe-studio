import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { book } from "@/server/db/schema";

export const bookRouter = createTRPCRouter({
  createBook: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(book).values(input);
    }),
});
