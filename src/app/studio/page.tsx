import { StudioView } from "@/modules/studio/views/studio-view";
import { api, HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function Studio() {
  void api.prompt.getPrompts.prefetch();

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}
