import type { AppRouter } from "@/server/api/root";
import { book, image, prompt } from "@/server/db/schema";
import type { inferRouterOutputs } from "@trpc/server";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const promptSchema = createSelectSchema(prompt);
export type Prompt = z.infer<typeof promptSchema>;

export const imageSchema = createSelectSchema(image);
export type Image = z.infer<typeof imageSchema>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

type GetImagesOutput = RouterOutputs["image"]["getImages"];

export type ImageWithPrompt = GetImagesOutput[number];

export type Book = RouterOutputs["book"]["getBooks"][number];
