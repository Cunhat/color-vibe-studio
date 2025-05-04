import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <Hero />
        <Features />
        <Gallery />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
    </HydrateClient>
  );
}
