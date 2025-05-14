import { TextCursorInput } from "lucide-react";
import React from "react";

export default function NoPrompt() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <TextCursorInput className="text-primary/50 h-10 w-10" />
      </div>
      <h3 className="mb-2 text-xl font-medium">Start with a prompt</h3>
      <p className="text-muted-foreground text-sm">
        Describe what you want to generate below
      </p>
    </div>
  );
}
