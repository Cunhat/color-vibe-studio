import StudioViewId from "@/modules/studio/views/studio-view-id";
import { api, HydrateClient } from "@/trpc/server";

export default function StudioPage({ params }: { params: { id: string } }) {
  const { id } = params;

  void api.prompt.getPromptById.prefetch({ id });

  return (
    <HydrateClient>
      <StudioViewId id={id} />
    </HydrateClient>
  );
}
