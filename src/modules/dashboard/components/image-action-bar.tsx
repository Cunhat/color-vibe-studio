import { Button } from "@/components/ui/button";
import { Book, Save } from "lucide-react";
import React from "react";
import DeleteRecentImages from "./delete-recent-images";
import AddToBook from "./add-to-book";
import type { ImageWithPrompt } from "@/lib/schemas";

type ImageActionBarProps = {
  selectedImages: Array<string>;
  images: Array<ImageWithPrompt>;
};

export default function ImageActionBar({
  selectedImages,
  images,
}: ImageActionBarProps) {
  if (!selectedImages.length) return null;

  return (
    <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center py-4">
      <div className="flex justify-end gap-2 rounded-xl border bg-white p-4 shadow-lg">
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4" />
          Download
        </Button>
        <AddToBook selectedImages={selectedImages} />
        <DeleteRecentImages selectedImages={selectedImages} />
      </div>
    </div>
  );
}
