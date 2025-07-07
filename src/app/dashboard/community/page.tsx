import CommunityView from "@/modules/dashboard/views/community-view";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Community() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  void api.image.getLastCommunityImages.prefetch({
    limit: 4,
  });

  return (
    <HydrateClient>
      <CommunityView />
    </HydrateClient>
  );
}
