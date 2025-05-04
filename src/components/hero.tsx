import { Button } from "@/components/ui/button";
import { PenToolIcon, SparklesIcon } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Transform Text to{" "}
              <span className="gradient-text">Beautiful Line Art</span>
            </h1>
            <p className="text-muted-foreground mb-8 max-w-[600px] text-lg">
              Create coloring pages instantly from text prompts. Perfect for
              educators, publishers, and creative hobbyists seeking personalized
              coloring content.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                <SparklesIcon className="h-4 w-4" />
                Start Creating
              </Button>
              <Button size="lg" variant="outline">
                View Examples
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="blob-animation absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-purple-100/60 to-violet-100/60"></div>
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-lg">
              <div className="border-border bg-secondary/50 rounded-xl border p-3">
                <div className="mb-4 rounded-lg bg-white p-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <PenToolIcon className="text-primary h-4 w-4" />
                    <p className="text-sm font-medium">Text to Line Art</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-xs">Prompt</p>
                  <div className="bg-background rounded-md border p-3 text-sm">
                    A magical unicorn in an enchanted forest
                  </div>
                  <div className="flex h-64 items-center justify-center rounded-md bg-purple-50">
                    <svg
                      className="drawing-animation h-48 w-48"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M70,30 C70,30 80,40 80,50 C80,60 70,70 60,70 C50,70 40,60 40,50 C40,40 50,30 60,30 C70,30 70,30 70,30" />
                      <path d="M30,30 C20,30 10,40 10,50 C10,60 20,70 30,70 C35,70 40,65 40,60" />
                      <path d="M60,30 C60,20 50,10 40,10 C30,10 20,20 20,30" />
                      <path d="M40,60 C40,70 50,80 60,80 C70,80 80,70 80,60" />
                      <path d="M30,70 C20,80 20,90 30,90 C40,90 50,80 60,80" />
                    </svg>
                  </div>
                  <Button className="w-full">Generate Line Art</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
