import StudioViewId from "@/modules/studio/views/studio-view-id";
import { api, HydrateClient } from "@/trpc/server";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  void api.prompt.getPromptById.prefetch({ id });

  return (
    <HydrateClient>
      <StudioViewId id={id} />
    </HydrateClient>
  );
}
