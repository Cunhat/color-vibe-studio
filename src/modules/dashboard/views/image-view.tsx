"use client";

import { Suspense, useEffect, useState } from "react";
import ImageHeaderSection from "../sections/image/image-header-section";
import ImageViewSection from "../sections/image/image-view-section";
import { api } from "@/trpc/react";
import type { ImageWithPrompt } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Book, Save, Trash, Trash2 } from "lucide-react";

export function ImageView() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ImageViewSuspense />
    </Suspense>
  );
}

function ImageViewSuspense() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<
    Array<ImageWithPrompt["id"]>
  >([]);

  const [image] = api.image.getImages.useSuspenseQuery();

  return (
    <div className="container flex-1 px-4 py-8 md:py-12">
      <ImageHeaderSection viewMode={viewMode} setViewMode={setViewMode} />
      {!!selectedImage?.length && (
        <div className="bg-primary/10 border-primary/50 mb-4 flex justify-end gap-2 rounded-xl border p-4">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Book className="h-4 w-4" />
            Add to Book
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      )}
      <ImageViewSection
        viewMode={viewMode}
        images={image}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
