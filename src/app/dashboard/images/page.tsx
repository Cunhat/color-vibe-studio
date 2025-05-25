import { ImageView } from "@/modules/dashboard/views/image-view";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Images() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  void api.image.getImages.prefetch();

  return (
    <HydrateClient>
      <ImageView />
    </HydrateClient>
  );
}
