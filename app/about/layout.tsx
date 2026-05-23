import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "About",
  description: `${brandTokens.agencyName} is a modern, inclusive modelling and talent agency in Lagos focused on creativity, diversity and professional growth.`,
  openGraph: {
    title: buildAgencyPageTitle("About"),
    // url: '' this is the live url
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
