"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ImageWithPrompt } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

type AddToBookProps = {
  selectedImage: Array<ImageWithPrompt["id"]>;
};

export default function AddToBook({ selectedImage }: AddToBookProps) {
  const bookQuery = api.book.getBooks.useQuery();

  const addImageToBook = api.book.addImageToBook.useMutation({
    onSuccess: () => {
      toast.success("Image added to book");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Add to Book
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {bookQuery.isFetching ? (
          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          </DropdownMenuItem>
        ) : (
          <>
            {bookQuery.data?.map((book) => (
              <DropdownMenuItem
                key={book.id}
                onClick={() =>
                  addImageToBook.mutate({
                    bookId: book.id,
                    imageId: selectedImage,
                  })
                }
              >
                {book.title}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
