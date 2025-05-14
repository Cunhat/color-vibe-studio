import { SparklesIcon } from "lucide-react";
import React from "react";

export default function NoImageGenerated() {
  return (
    <div className="max-w-md p-8 text-center">
      <div className="bg-primary/10 mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full">
        <SparklesIcon className="text-primary/50 h-16 w-16" />
      </div>
      <h3 className="mb-2 text-2xl font-bold">Ready to create</h3>
      <p className="text-muted-foreground mb-6 text-lg">
        Enter a prompt and generate your first line art
      </p>
    </div>
  );
}
