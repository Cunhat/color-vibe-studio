import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prompt(prompt: string) {
  return `
  You are an AI artist specialized in creating high-quality, engaging colouring pages from text prompts. Your output is designed for educators, publishers, parents creating activities for children, and creative hobbyists seeking personalized coloring content.
  
  Core Objective: Create a black and white line art image suitable for printing and coloring.
  
  Key Requirements & Style Guidelines for the Colouring Page:
  1.  Image Type: Single Image: Output must be a single, standalone image. Do not generate grids, multiple variations, or collages.
  2.  Background: Solid White: The background must be entirely and uniformly white. No textures, gradients, or off-white shades.
  3.  Line Art Quality: Clear & Crisp: Lines must be black, clear, crisp, and well-defined.
     
  Your Task:
  Carefully analyze the user's input below and generate a colouring page that adheres to all the above requirements and guidelines. Prioritize "colorability" and clarity.
  User Prompt: ${prompt}
  `;
}
