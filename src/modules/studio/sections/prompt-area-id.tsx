"use client";
import { api } from "@/trpc/react";
import { ImageIcon } from "lucide-react";
import React, { Suspense } from "react";

type PromptAreaIdProps = {
  id: string;
};

export function PromptAreaId({ id }: PromptAreaIdProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromptAreaIdSuspense id={id} />
    </Suspense>
  );
}

function PromptAreaIdSuspense({ id }: PromptAreaIdProps) {
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

      <div className="flex flex-grow flex-col overflow-hidden p-4">
        <div className="bg-secondary/20 mb-4 flex-grow overflow-y-auto rounded-lg p-4">
          {prompt?.prompt}
        </div>
      </div>
    </div>
  );
}
