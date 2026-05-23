import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "Models",
  description: `Explore the faces of ${brandTokens.agencyName} — a diverse representation of beauty, creativity, and individuality redefining modern modelling in Africa.`,
  openGraph: {
    title: buildAgencyPageTitle("Models"),
    // url: '' this is the live url
  },
};

export default function ModelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
