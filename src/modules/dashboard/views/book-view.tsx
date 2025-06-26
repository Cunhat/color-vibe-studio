"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import {
  ArrowLeftIcon,
  BookIcon,
  DownloadIcon,
  ImageIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

type BookViewProps = {
  id: string;
};

export function BookView({ id }: BookViewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookViewSuspense id={id} />
    </Suspense>
  );
}

function BookViewSuspense({ id }: BookViewProps) {
  const [book] = api.book.getBookById.useSuspenseQuery({ id });

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 px-4 py-8 md:py-12">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="h-auto p-0">
            <Link href="/dashboard/books">
              <ArrowLeftIcon className="mr-1 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
        </div>

        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
              <BookIcon className="text-primary h-6 w-6" />
              {book.title}
            </h1>
            {book.description && (
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {book.description}
              </p>
            )}
          </div>

          <div className="mt-4 flex gap-2 md:mt-0">
            <Button variant="outline" asChild>
              <Link href="/generator">
                <PlusIcon className="mr-1 h-4 w-4" />
                Add New Image
              </Link>
            </Button>
            <Button variant="destructive">
              <TrashIcon className="mr-1 h-4 w-4" />
              Delete Book
            </Button>
          </div>
        </div>

        {book.images.length === 0 ? (
          <div className="bg-secondary/30 rounded-lg border py-12 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <ImageIcon className="text-primary h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No images yet</h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              Start adding images to this book from the image generator.
            </p>
            <Button asChild>
              <Link href="/generator">
                <PlusIcon className="mr-1 h-4 w-4" />
                Create New Image
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* {book.images.map((image, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <img
                  src={image.url}
                  alt={`Line art ${index + 1}`}
                  className="h-48 w-full bg-purple-50 object-contain"
                />
                <CardContent className="flex items-center justify-between py-4">
                  <span className="text-muted-foreground text-sm">
                    Image {index + 1}
                  </span>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
}
