import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { prefetchModelDetails } from "@/sanity/lib/prefetch";
import { client } from "@/sanity/lib/client";
import { MODEL_DETAILS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";
// components imports
import ModelDetails from "@/components/ModelsComponents/ModelDetails/ModelDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const model = await client.fetch(MODEL_DETAILS_QUERY, { slug });
    if (!model) return {};

    const imageUrl = model.headshot
      ? urlFor(model.headshot).auto("format").url()
      : model.gallery && model.gallery.length
        ? model.gallery[0]
        : null;

    const title = buildAgencyPageTitle(model.name);
    const description = `Meet ${model.name} — profile on ${brandTokens.agencyName}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: `${model.name} — ${brandTokens.agencyName}`,
              },
            ]
          : undefined,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch (err) {
    return {};
  }
}

export default async function ModelDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const queryClient = getQueryClient();
  const { slug } = await params;

  await prefetchModelDetails(queryClient, slug);

  return (
    <main className="container model-details-page-container">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ModelDetails slug={slug} />
      </HydrationBoundary>
    </main>
  );
}
