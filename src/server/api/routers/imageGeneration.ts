import { env } from "@/env";
import OpenAI from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const openai = new OpenAI({
  apiKey: env.OPEN_AI_API,
});

export const imageGenerationRouter = createTRPCRouter({
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const prompt = `
You are an AI artist specialized in creating high-quality, engaging colouring pages from text prompts. Your output is designed for educators, publishers, parents creating activities for children, and creative hobbyists seeking personalized coloring content.

Core Objective: Create a black and white line art image suitable for printing and coloring.

Key Requirements & Style Guidelines for the Colouring Page:
1.  Image Type: Single Image: Output must be a single, standalone image. Do not generate grids, multiple variations, or collages.
2.  Background: Solid White: The background must be entirely and uniformly white. No textures, gradients, or off-white shades.
3.  Line Art Quality: Clear & Crisp: Lines must be black, clear, crisp, and well-defined.
   
Your Task:
Carefully analyze the user's input below and generate a colouring page that adheres to all the above requirements and guidelines. Prioritize "colorability" and clarity.
User Prompt: ${input.prompt}
`;

        console.log("prompt ====>", prompt);

        const result = await openai.images.generate({
          model: "gpt-image-1",
          prompt,
          size: "1536x1024",
          quality: "medium",
        });

        console.log("response ====>", result);

        return result;
      } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image");
      }
    }),
});
