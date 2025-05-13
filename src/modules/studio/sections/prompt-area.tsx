"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  SparklesIcon,
  DownloadIcon,
  LoaderIcon,
  RotateCcwIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ArrowLeft,
  Redo,
  Undo,
  Image as ImageIcon,
  SendIcon,
  TextCursorInput,
  BookIcon,
  History,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { env } from "@/env";
import { api } from "@/trpc/react";

type PromptAreaProps = {
  id: string;
};

export function PromptArea({ id }: PromptAreaProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromptAreaSuspense id={id} />
    </Suspense>
  );
}

function PromptAreaSuspense({ id }: { id: string }) {
  const [prompt, setPrompt] = useState(prompt?.prompt || "");
  const [prompt] = api.prompt.getPromptById.useSuspenseQuery({ id });

  return (
    <div className="border-border/50 bg-background flex w-1/3 flex-col border-r">
      {/* Header */}
      <div className="border-border/50 flex items-center border-b p-4">
        <h1 className="flex items-center text-2xl font-bold">
          <ImageIcon className="text-primary mr-2 h-6 w-6" />
          Studio Generator
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow flex-col overflow-hidden p-4">
        {/* Chat/History Display - Mimics Lovable's conversation area */}
        <div className="bg-secondary/20 mb-4 flex-grow overflow-y-auto rounded-lg p-4">
          {!id ? (
            <div className="space-y-4">
              {imageHistory.map((img, idx) => (
                <div
                  key={img.id}
                  className={`rounded-lg p-3 ${idx === currentImageIndex ? "bg-primary/10 border-primary/30 border" : "bg-secondary/40"}`}
                  onClick={() => selectImage(idx)}
                >
                  <p className="text-muted-foreground text-sm">Prompt:</p>
                  <p className="text-sm font-medium">{img.prompt}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {new Date(img.timestamp).toLocaleTimeString()}
                    </span>
                    {idx === currentImageIndex && (
                      <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                <TextCursorInput className="text-primary/50 h-10 w-10" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Start with a prompt</h3>
              <p className="text-muted-foreground text-sm">
                Describe what you want to generate below
              </p>
            </div>
          )}
        </div>

        {/* Bottom Prompt Area - Similar to Lovable's input area */}
        <div className="bg-background border-border/50 sticky bottom-0 rounded-lg border shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            {!id && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
