import { HydrateClient } from "@/trpc/server";

export default function StudioPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <HydrateClient>
      <div>StudioPage {id}</div>
    </HydrateClient>
  );
}
