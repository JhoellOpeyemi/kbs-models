import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { prefetchHomeModels } from "@/sanity/lib/prefetch";

import Loader from "@/components/Home/Loader/Loader";
import Hero from "@/components/Home/Hero/Hero";
import HomeAbout from "@/components/Home/HomeAbout/HomeAbout";
import HomeModels from "@/components/Home/HomeModels/HomeModels";
import HomeFeatures from "@/components/Home/HomeFeatures/HomeFeatures";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import Divider from "@/components/ui/Divider";

export default async function Home() {
  const queryClient = getQueryClient();

  await prefetchHomeModels(queryClient);

  return (
    <>
      <Loader />
      <div className="container">
        <main>
          <Hero />
          <Divider />
          <HomeAbout />
          <Divider />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <HomeModels />
          </HydrationBoundary>
          <Divider />
          <HomeFeatures />
          <Testimonials />
        </main>
      </div>
    </>
  );
}
