"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import dayjs from "dayjs";
import { GalleryVerticalIcon, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function RecentImagesSection() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RecentImagesSectionSuspense />
    </Suspense>
  );
}

function RecentImagesSectionSuspense() {
  const [images] = api.image.getRecentImages.useSuspenseQuery();

  if (images.length === 0) {
    return (
      <Card className="col-span-full p-4 text-center">
        <CardContent className="py-8">
          <ImageIcon className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
          <p className="text-muted-foreground">
            You haven't generated any images yet
          </p>
          <Button asChild className="mt-4">
            <Link href="/studio">Generate Your First Image</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <GalleryVerticalIcon className="h-5 w-5" />
        Recent Images
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, 4).map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden py-0 transition-shadow hover:shadow-md"
          >
            <div className="bg-secondary/30 flex aspect-square items-center justify-center overflow-hidden">
              <img
                src={image.url}
                alt={image.id}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="py-4">
              <p className="line-clamp-2 text-sm">
                {image?.prompt?.prompt ?? ""}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {dayjs(image.createdAt).format("MMM D, YYYY, h:mm A")}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card className="bg-secondary/20 flex h-full items-center justify-center border-dashed">
          <CardContent className="p-8 text-center">
            <Button
              asChild
              variant="ghost"
              className="flex h-full w-full flex-col gap-2"
            >
              <Link href="/studio">
                <ImageIcon className="text-primary/70 mx-auto mb-2 h-6 w-6" />
                <span>Generate More Images</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
