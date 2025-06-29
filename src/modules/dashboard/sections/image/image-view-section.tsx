"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { ImageWithPrompt } from "@/lib/schemas";
import dayjs from "dayjs";
import { Calendar, DownloadIcon, ImageIcon } from "lucide-react";
import Link from "next/link";

type ImageViewSectionProps = {
  viewMode: "grid" | "list";
  images: ImageWithPrompt[];
  selectedImage: Array<ImageWithPrompt["id"]>;
  setSelectedImage: (image: Array<ImageWithPrompt["id"]>) => void;
};

export default function ImageViewSection({
  viewMode,
  images,
  selectedImage,
  setSelectedImage,
}: ImageViewSectionProps) {
  async function handleDownload(image: ImageWithPrompt) {
    try {
      // Fetch the image as a blob
      const response = await fetch(image.url);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement("a");
      link.href = blobUrl;

      // Generate a filename based on the image ID and current timestamp
      const filename = `image-${image.id}-${Date.now()}.png`;

      link.download = filename;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to opening in new tab if download fails
      window.open(image.url, "_blank");
    }
  }

  function handleSelectImage(image: ImageWithPrompt) {
    if (selectedImage.includes(image.id)) {
      setSelectedImage(selectedImage.filter((id) => id !== image.id));
    } else {
      setSelectedImage([...selectedImage, image.id]);
    }
  }

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
              <Checkbox
                className="group-hover:border-input absolute top-2 left-2 z-20 border-black"
                checked={selectedImage.includes(image.id)}
                onCheckedChange={() => handleSelectImage(image)}
              />
              <img
                src={image.url}
                alt={image.id}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(image)}
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
              <Checkbox
                checked={selectedImage.includes(image.id)}
                onCheckedChange={() => handleSelectImage(image)}
              />
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
                  onClick={() => handleDownload(image)}
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
