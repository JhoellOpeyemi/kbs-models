import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "Shop",
  description: `Shop curated modelling guides, digital resources and creative products from ${brandTokens.agencyName}.`,
  openGraph: {
    title: buildAgencyPageTitle("Shop"),
    // url: '' this is the live url
  },
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
