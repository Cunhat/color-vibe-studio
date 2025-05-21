import { StudioView } from "@/modules/studio/views/studio-view";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Studio() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  void api.prompt.getPrompts.prefetch();

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}
