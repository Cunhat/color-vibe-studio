import StudioViewId from "@/modules/studio/views/studio-view-id";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  void api.prompt.getPromptById.prefetch({ id });

  return (
    <HydrateClient>
      <StudioViewId id={id} />
    </HydrateClient>
  );
}
