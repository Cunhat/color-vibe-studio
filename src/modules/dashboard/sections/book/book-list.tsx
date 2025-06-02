"use client";

import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookIcon, ImageIcon, PlusIcon, Calendar } from "lucide-react";
import { api } from "@/trpc/react";
import Link from "next/link";
import dayjs from "dayjs";

interface Book {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  images: string[];
}

export function BookList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookListSuspense />
    </Suspense>
  );
}

export function BookListSuspense() {
  const [books] = api.book.getBooks.useSuspenseQuery();

  if (books.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-violet-100 shadow-lg">
          <BookIcon className="text-primary h-10 w-10" />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900">
          No books created yet
        </h3>
        <p className="text-muted-foreground mx-auto mb-8 max-w-md leading-relaxed">
          Create your first book to start storing and organizing your generated
          line art into beautiful collections.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card
          key={book.id}
          className="group overflow-hidden border-0 bg-white py-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <Link href={`/dashboard/books/${book.id}`} className="block">
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-400/10"></div>
              <div className="relative flex h-full items-center justify-center">
                {book.images.length > 0 ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <ImageIcon className="text-primary h-7 w-7" />
                    </div>
                    <div className="rounded-full bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm">
                      <span className="text-sm font-medium text-gray-700">
                        {book.images.length} images
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="group-hover:text-primary flex flex-col items-center space-y-2 text-gray-400 transition-colors duration-300">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <PlusIcon className="h-7 w-7" />
                    </div>
                    <span className="text-sm font-medium">
                      Add your first image
                    </span>
                  </div>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold text-gray-900 transition-colors duration-200">
                  {book.title}
                </h3>
                {book.description && (
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {book.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{dayjs(book.createdAt).format("DD/MM/YYYY")}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 h-auto px-3 py-1 text-xs font-medium transition-colors duration-200"
                    asChild
                  >
                    <div className="flex items-center space-x-1">
                      <span>View Book</span>
                      <ImageIcon className="h-3.5 w-3.5" />
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
