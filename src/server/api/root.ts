import { imageGenerationRouter } from "@/server/api/routers/imageGeneration";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { promptRouter } from "./routers/prompt";
import { bookRouter } from "./routers/book";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  imageGeneration: imageGenerationRouter,
  prompt: promptRouter,
  book: bookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
