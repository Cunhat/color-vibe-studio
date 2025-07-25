"use client";
import { api } from "@/trpc/react";
import React from "react";
import { BookFilterItem } from "../../components/book-filter-item";
import { useQueryState } from "nuqs";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookListSidebar() {
  const [bookId, setBookId] = useQueryState("bookId");

  const booksQuery = api.book.getBooks.useQuery();

  if (booksQuery.isLoading) {
    return (
      <BookListContainer>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </BookListContainer>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Books</h2>
      <BookFilterItem
        onClick={() => setBookId(null)}
        isSelected={!bookId}
        isAllOption
      />
      {booksQuery.data?.map((book) => (
        <BookFilterItem
          key={book.id}
          book={book}
          onClick={() => setBookId(book.id)}
          isSelected={book.id === bookId}
        />
      ))}
    </div>
  );
}

function BookListContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Books</h2>
      {children}
    </div>
  );
}
