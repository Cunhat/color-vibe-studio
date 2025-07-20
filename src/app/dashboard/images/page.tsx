import { ImageView } from "@/modules/dashboard/views/image-view";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Images({
  searchParams,
}: {
  searchParams: Promise<{ bookId: string | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { bookId } = await searchParams;

  if (!session) {
    redirect("/signin");
  }

  void api.image.getImages.prefetch();
  void api.book.getBooks.prefetch();
  void api.image.getImagesByBookId.prefetch({ id: bookId });

  return (
    <HydrateClient>
      <ImageView />
    </HydrateClient>
  );
}
