import React from "react";
import { ListCommunityImagesSection } from "../sections/community/list-community-images-section";

export default function CommunityView() {
  return (
    <div className="container flex-1 px-4 py-6">
      <div className="mb-8 flex flex-col items-start">
        <h1 className="text-3xl font-bold tracking-tight">Community Images</h1>
        <p className="text-muted-foreground mt-1">
          Explore the community's latest creations
        </p>
      </div>
      <ListCommunityImagesSection />
    </div>
  );
}
