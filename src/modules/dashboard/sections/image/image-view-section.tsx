"use client";
import { BookIcon } from "lucide-react";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DownloadIcon, Grid3x3, ImageIcon, List } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import dayjs from "dayjs";
import type { ImageWithPrompt } from "@/lib/schemas";

type ImageViewSectionProps = {
  viewMode: "grid" | "list";
  images: ImageWithPrompt[];
};

export default function ImageViewSection({
  viewMode,
  images,
}: ImageViewSectionProps) {
  if (images.length === 0)
    return (
      <Card className="p-12 text-center">
        <CardContent>
          <ImageIcon className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
          <h3 className="mb-2 text-lg font-medium">No images yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't generated any images yet. Start creating to see them
            here.
          </p>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/studio">
                <ImageIcon className="mr-2 h-4 w-4" />
                Studio Generator
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className="group overflow-hidden py-0 transition-shadow hover:shadow-md"
          >
            <div className="bg-secondary/30 relative aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.id}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  //   onClick={() => handleDownload(image)}
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
                {/* <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSelectedImage(image);
                    setShowBookDialog(true);
                  }}
                  disabled={books.length === 0}
                >
                  <BookIcon className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
            <CardContent className="p-4">
              <p className="mb-2 line-clamp-2 text-sm">
                {image?.prompt?.prompt ?? ""}
              </p>
              <div className="text-muted-foreground flex items-center text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                {dayjs(image.createdAt).format("MMM D, YYYY, h:mm A")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {images.map((image) => (
        <Card key={image.id} className="py-0 transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/30 h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={image.id}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-grow">
                <p className="mb-1 line-clamp-1 font-medium">
                  {image?.prompt?.prompt ?? ""}
                </p>
                <div className="text-muted-foreground flex items-center text-sm">
                  <Calendar className="mr-1 h-3 w-3" />
                  {dayjs(image.createdAt).format("MMM D, YYYY, h:mm A")}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  //   onClick={() => handleDownload(image)}
                >
                  <DownloadIcon className="mr-1 h-4 w-4" />
                  Download
                </Button>
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(image);
                    setShowBookDialog(true);
                  }}
                  disabled={books.length === 0}
                >
                  <BookIcon className="mr-1 h-4 w-4" />
                  Save to Book
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
