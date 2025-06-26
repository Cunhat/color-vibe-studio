import { BookView } from "@/modules/dashboard/views/book-view";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Book({
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

  void api.book.getBookById.prefetch({ id });

  return (
    <HydrateClient>
      <BookView id={id} />
    </HydrateClient>
  );
}
