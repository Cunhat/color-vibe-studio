import { Image as ImageIcon } from "lucide-react";

import CreatePrompt from "../components/create-prompt";
import NoPrompt from "../components/no-prompt";

export function PromptArea() {
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
          <NoPrompt />
        </div>
        <CreatePrompt />
      </div>
    </div>
  );
}
