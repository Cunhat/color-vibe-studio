import BookView from "@/modules/dashboard/views/book-view";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Books() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  void api.book.getBooks.prefetch();

  return (
    <HydrateClient>
      <BookView />
    </HydrateClient>
  );
}
