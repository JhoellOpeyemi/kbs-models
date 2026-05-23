import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "Blog",
  description: `Explore ${brandTokens.agencyName}' blog — insights on modelling, lifestyle, and creative growth for aspiring and professional models.`,
  openGraph: {
    title: buildAgencyPageTitle("Blog"),
    // url: '' this is the live url
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
