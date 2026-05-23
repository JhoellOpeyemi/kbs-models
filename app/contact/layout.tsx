import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "Contact",
  description: `Connect with ${brandTokens.agencyName} — collaborate, partner, or join our growing network of creative professionals and aspiring models.`,
  openGraph: {
    title: buildAgencyPageTitle("Contact"),
    // url: '' this is the live url
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
