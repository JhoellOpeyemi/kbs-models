import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "Become a Model",
  description: `Start your modelling journey with ${brandTokens.agencyName}. Submit your application and join a community redefining beauty and confidence in Lagos.`,
  openGraph: {
    title: buildAgencyPageTitle("Become a Model"),
    // url: '' this is the live url
  },
};

export default function ApplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
