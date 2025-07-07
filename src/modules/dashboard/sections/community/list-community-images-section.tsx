"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import dayjs from "dayjs";
import React from "react";

export function ListCommunityImagesSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.image.getLastCommunityImages.useInfiniteQuery(
      {
        limit: 4,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const images = data?.pages.flatMap((page) => page.images) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
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
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
