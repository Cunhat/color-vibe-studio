"use client";

import { Button } from "@/components/ui/button";
import type { ImageWithPrompt } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { Book, Save, Loader } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import BookListSidebar from "../sections/book/book-list-sidebar";
import DeleteRecentImages from "../sections/image/delete-recent-images";
import ImageHeaderSection from "../sections/image/image-header-section";
import ImageViewSection from "../sections/image/image-view-section";

export function ImageView() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<
    Array<ImageWithPrompt["id"]>
  >([]);
  const [bookId] = useQueryState("bookId");

  const imagesQuery = api.image.getImagesByBookId.useQuery({
    id: bookId ?? undefined,
  });

  return (
    <div className="container flex-1 px-4 py-6">
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
          <DeleteRecentImages selectedImages={selectedImage} />
        </div>
      )}
      <div className="grid grid-cols-[200px_1fr] gap-4">
        <BookListSidebar />
        {imagesQuery.isLoading ? (
          <div className="flex h-full items-center justify-center gap-2">
            <Loader className="text-primary size-6 animate-spin" />
            <h1 className="text-muted-foreground">Loading images...</h1>
          </div>
        ) : (
          <ImageViewSection
            viewMode={viewMode}
            images={imagesQuery.data ?? []}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
      </div>
    </div>
  );
}
