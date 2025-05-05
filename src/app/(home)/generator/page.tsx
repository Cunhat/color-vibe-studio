"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  SparklesIcon,
  DownloadIcon,
  RefreshCwIcon,
  LoaderIcon,
  WandSparklesIcon,
  PaletteIcon,
  PenIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [complexity, setComplexity] = useState("simple");
  const [style, setStyle] = useState("children");

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate artwork");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedImage("/placeholder.svg");
      setIsGenerating(false);
      toast.success("Line art generated successfully!");
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    // In a real implementation, this would download the actual image
    // For now, we'll just open the image in a new tab
    window.open(generatedImage, "_blank");
    toast.success("Download started!");
  };

  return (
    <main className="bg-secondary/20 flex-1 py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Line Art Generator
          </h1>
          <p className="text-muted-foreground mt-4 text-xl">
            Transform your ideas into beautiful line art illustrations with our
            AI-powered generator.
          </p>
        </div>

        <Card className="border-border/50 mx-auto max-w-5xl">
          <CardContent className="p-6 md:p-8">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="prompt"
                    className="mb-2 block text-lg leading-none font-medium"
                  >
                    Your Prompt
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe what you want to create... (e.g., 'A friendly dragon in a castle')"
                    className="min-h-[180px] resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm leading-none font-medium">
                      Complexity
                    </label>
                    <ToggleGroup
                      type="single"
                      value={complexity}
                      onValueChange={(value) => value && setComplexity(value)}
                    >
                      <ToggleGroupItem value="simple" className="flex-1">
                        <PenIcon className="mr-2 h-4 w-4" />
                        Simple
                      </ToggleGroupItem>
                      <ToggleGroupItem value="medium" className="flex-1">
                        <WandSparklesIcon className="mr-2 h-4 w-4" />
                        Medium
                      </ToggleGroupItem>
                      <ToggleGroupItem value="detailed" className="flex-1">
                        <PaletteIcon className="mr-2 h-4 w-4" />
                        Detailed
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm leading-none font-medium">
                      Style
                    </label>
                    <ToggleGroup
                      type="single"
                      value={style}
                      onValueChange={(value) => value && setStyle(value)}
                    >
                      <ToggleGroupItem value="children" className="flex-1">
                        Children
                      </ToggleGroupItem>
                      <ToggleGroupItem value="cartoon" className="flex-1">
                        Cartoon
                      </ToggleGroupItem>
                      <ToggleGroupItem value="minimal" className="flex-1">
                        Minimal
                      </ToggleGroupItem>
                      <ToggleGroupItem value="sketch" className="flex-1">
                        Sketch
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full py-6 text-lg"
                  disabled={isGenerating || !prompt.trim()}
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="mr-2 h-5 w-5" />
                      Generate Line Art
                    </>
                  )}
                </Button>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">Preview</p>
                  {generatedImage && (
                    <div className="text-muted-foreground flex items-center text-sm">
                      <span className="mr-2 inline-block h-3 w-3 rounded-full bg-green-500"></span>
                      Ready to download
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 border-border/50 flex min-h-[360px] flex-1 items-center justify-center overflow-hidden rounded-md border">
                  {generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated line art"
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <SparklesIcon className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
                      <p className="text-muted-foreground text-lg">
                        Your generated line art will appear here
                      </p>
                      <p className="text-muted-foreground/70 mx-auto mt-2 max-w-xs text-sm">
                        Create unique coloring pages by entering a detailed
                        description
                      </p>
                    </div>
                  )}
                </div>

                {generatedImage && (
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="default"
                      onClick={handleDownload}
                      className="flex-1"
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleGenerate}
                      className="flex-1"
                      disabled={isGenerating}
                    >
                      <RefreshCwIcon className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="border-border/50 mt-8 border-t pt-6">
              <h3 className="mb-3 text-lg font-medium">
                Tips for great results:
              </h3>
              <ul className="grid gap-4 md:grid-cols-3">
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-full">
                    1
                  </div>
                  <span className="text-sm">
                    Be specific about subjects and their actions
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-full">
                    2
                  </div>
                  <span className="text-sm">
                    Describe the setting and environment
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-full">
                    3
                  </div>
                  <span className="text-sm">
                    Specify if it's for children or educational use
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
