import { List } from "lucide-react";
import { Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import React from "react";

type ImageHeaderSectionProps = {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
};

export default function ImageHeaderSection({
  viewMode,
  setViewMode,
}: ImageHeaderSectionProps) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <ImageIcon className="text-primary h-7 w-7" />
          Your Images
        </h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage your generated line art
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 md:mt-0">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("grid")}
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
