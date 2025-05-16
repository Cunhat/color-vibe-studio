import { image, prompt } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const promptSchema = createSelectSchema(prompt);
export type Prompt = z.infer<typeof promptSchema>;

export const imageSchema = createSelectSchema(image);
export type Image = z.infer<typeof imageSchema>;
