"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ImageWithPrompt } from "@/lib/schemas";
import { api } from "@/trpc/react";

type AddToBookProps = {
  selectedImages: Array<string>;
};

export default function AddToBook({ selectedImages }: AddToBookProps) {
  const booksQuery = api.book.getBooks.useQuery();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Book className="h-4 w-4" />
          Add to Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Book</DialogTitle>
          <DialogDescription>
            Select a book to add the selected images to.
          </DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {booksQuery.data?.map((book) => {
              return (
                <SelectItem key={book.id} value={book.id}>
                  {book.title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Add to Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
