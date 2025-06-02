"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { BookIcon, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function RecentBookSection() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RecentBookSectionSuspense />
    </Suspense>
  );
}

function RecentBookSectionSuspense() {
  const [books] = api.book.getRecentBooks.useSuspenseQuery();

  if (books.length === 0) {
    return (
      <Card className="col-span-full p-4 text-center">
        <CardContent className="py-8">
          <BookIcon className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
          <p className="text-muted-foreground">
            You haven't created any books yet
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/books">Create Your First Book</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <BookIcon className="h-5 w-5" />
        Recent Books
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <Link href={`/books/${book.id}`} key={book.id}>
            <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
              <div className="flex h-24 items-center justify-center bg-purple-50">
                {book?.images?.length > 0 ? (
                  <div className="flex gap-1">
                    <ImageIcon className="text-primary/40 h-5 w-5" />
                    <span className="text-primary/60 text-sm">
                      {book?.images?.length} images
                    </span>
                  </div>
                ) : (
                  <BookIcon className="text-primary/30 h-8 w-8" />
                )}
              </div>
              <CardContent className="">
                <h3 className="line-clamp-1 font-medium">{book.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card className="bg-secondary/20 flex h-full items-center justify-center border-dashed">
          <CardContent className="p-8 text-center">
            <Button
              asChild
              variant="ghost"
              className="flex h-full w-full flex-col gap-2"
            >
              <Link href="/dashboard/books">
                <BookIcon className="text-primary/70 mx-auto mb-2 h-6 w-6" />
                <span>View All Books</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
