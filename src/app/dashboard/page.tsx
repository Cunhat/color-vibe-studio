import DashboardView from "@/modules/dashboard/views/dashboard-view";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  void api.image.getRecentImages.prefetch();

  return (
    <HydrateClient>
      <DashboardView user={session.user} />
    </HydrateClient>
  );
}
