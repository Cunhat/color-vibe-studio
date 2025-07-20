"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import dayjs from "dayjs";
import { UsersRound } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function CommunityImages() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <CommunityImagesSuspense />
    </Suspense>
  );
}

function CommunityImagesSuspense() {
  const [images] = api.image.getLastCommunityImages.useSuspenseQuery({
    limit: 4,
  });

  return (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <UsersRound className="h-5 w-5" />
          Explore Community Images
        </h2>
        <Link href="/dashboard/community">
          <Button variant="link">View All</Button>
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.images.map((image) => (
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
    </div>
  );
}
