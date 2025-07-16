"use client";

import { Button } from "@/components/ui/button";
import type { ImageWithPrompt } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { Book, Save } from "lucide-react";
import { useQueryState } from "nuqs";
import { Suspense, useState } from "react";
import DeleteRecentImages from "../sections/image/delete-recent-images";
import ImageHeaderSection from "../sections/image/image-header-section";
import ImageViewSection from "../sections/image/image-view-section";
import { BookFilterItem } from "../components/book-filter-item";

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
  const [bookId, setBookId] = useQueryState("bookId");

  const [books] = api.book.getBooks.useSuspenseQuery();
  const [images] = api.image.getImagesByBookId.useSuspenseQuery({
    id: bookId ?? undefined,
  });

  console.log("images", images);

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
          <DeleteRecentImages selectedImages={selectedImage} />
        </div>
      )}
      <div className="grid grid-cols-[200px_1fr] gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Books</h2>
          <BookFilterItem
            book={{
              id: "all",
              title: "All Books",
              images: [],
            }}
            onClick={() => setBookId(null)}
            isSelected={!bookId}
          />
          {books.map((book) => (
            <BookFilterItem
              key={book.id}
              book={book}
              onClick={() => setBookId(book.id)}
              isSelected={book.id === bookId}
            />
          ))}
        </div>
        <ImageViewSection
          viewMode={viewMode}
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </div>
  );
}
