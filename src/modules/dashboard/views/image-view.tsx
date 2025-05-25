"use client";

import { Suspense, useState } from "react";
import ImageHeaderSection from "../sections/image/image-header-section";
import ImageViewSection from "../sections/image/image-view-section";
import { api } from "@/trpc/react";

export function ImageView() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ImageViewSuspense />
    </Suspense>
  );
}

function ImageViewSuspense() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [image] = api.image.getImages.useSuspenseQuery();

  return (
    <div className="container flex-1 px-4 py-8 md:py-12">
      <ImageHeaderSection viewMode={viewMode} setViewMode={setViewMode} />
      <ImageViewSection viewMode={viewMode} images={image} />
    </div>
  );
}
