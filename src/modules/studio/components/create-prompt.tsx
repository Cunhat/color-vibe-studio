"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useState } from "react";

export default function CreatePrompt() {
  const [prompt, setPrompt] = useState("");
  const utils = api.useUtils();

  const generateImageMutation = api.imageGeneration.generateImage.useMutation({
    onSuccess: (data) => {
      console.log(data);
      utils.prompt.getPrompts.invalidate();
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateImageMutation.mutate({ prompt });
    }
  };

  return (
    <div className="bg-background border-border/50 sticky bottom-0 rounded-lg border shadow-lg">
      <div className="flex flex-col space-y-2 p-4">
        <div className="relative">
          <Textarea
            placeholder="Describe what you want to create... (e.g., 'A friendly dragon in a castle')"
            className="min-h-[100px] resize-none pr-12"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="absolute right-2 bottom-2"
            size="sm"
            disabled={!prompt.trim() || generateImageMutation.isPending}
            onClick={() => generateImageMutation.mutate({ prompt })}
          >
            {generateImageMutation.isPending ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
