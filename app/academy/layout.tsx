import { brandTokens, buildAgencyPageTitle } from "@/lib/designTokens";

export const metadata = {
  title: "Academy",
  description: `Join ${brandTokens.academyName} — professional training in modelling, grooming, and creative skills to build a strong foundation for your career.`,
  openGraph: {
    title: buildAgencyPageTitle("Academy"),
    // url: '' this is the live url
  },
};

export default function AcademyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-container">{children}</div>;
}
