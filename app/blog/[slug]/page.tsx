import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { prefetchBlogDetails } from "@/sanity/lib/prefetch";
import { client } from "@/sanity/lib/client";
import { BLOG_DETAILS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { buildAgencyPageTitle } from "@/lib/designTokens";

import BlogDetails from "@/components/Blog/BlogDetails/BlogDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await client.fetch(BLOG_DETAILS_QUERY, { slug });
    return {
      title: blog?.title || "Blog",
      description: blog?.introduction || "Read our blog",
    };
  } catch (error) {
    return {
      title: buildAgencyPageTitle("Blog"),
    };
  }
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const queryClient = getQueryClient();
  const { slug } = await params;

  await prefetchBlogDetails(queryClient, slug);

  return (
    <main className="container blog-details-page-container">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogDetails slug={slug} />
      </HydrationBoundary>
    </main>
  );
}
