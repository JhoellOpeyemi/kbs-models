import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { brandTokens } from "@/lib/designTokens";

import { ScrollToTopProvider } from "@/components/utils/ScrollToTopProvider";

import QueryProvider from "@/providers/QueryProvider";
import TransitionProvider from "@/providers/TransitionProvider";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Lenis from "./lenis";

import "./globals.css";
import "../styles/utils.css";
import "easymde/dist/easymde.min.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Black.woff2", weight: "900", style: "normal" },
    {
      path: "./fonts/Montserrat-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    { path: "./fonts/Montserrat-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "./fonts/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/Montserrat-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "./fonts/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/Montserrat-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Montserrat-Light.woff2", weight: "300", style: "normal" },
    {
      path: "./fonts/Montserrat-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase: new URL('live site')
  title: {
    default: `${brandTokens.agencyName} | Nigeria's First Dedicated Face Modelling Agency`,
    template: `%s | ${brandTokens.agencyName}`,
  },
  description: `${brandTokens.agencyName} is Nigeria's first dedicated face modelling agency, based in Lagos, Abuja and London. We specialize in talent development and model management. Our services include creative direction, model scouting, portfolio development, and training programs. Join us to become part of a diverse and dynamic modelling community that celebrates individuality and creativity.`,
  keywords: [
    brandTokens.agencyName,
    "Lagos modelling agency",
    "Nigeria modelling agency",
    "talent development",
    "model management Nigeria",
    "inclusive modelling",
    "fashion agency Lagos",
    "creative direction Lagos",
    "model scouting",
    "model scouting Lagos",
    "creative agency Lagos",
    "creative agency",
    "model portfolio",
    "modelling agency Lagos",
    "fashion brand Lagos",
    "model training Nigeria",
    "modelling academy Lagos",
    "become a model Lagos",
    "model application Lagos",
    "model submission form",
    "fashion school Nigeria",
    "fashion school Lagos",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: brandTokens.agencyName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body>
        <ScrollToTopProvider />
        <Lenis>
          <TransitionProvider>
            <Nav />
            <QueryProvider>{children}</QueryProvider>
            <Footer />
          </TransitionProvider>
        </Lenis>
        <Analytics />
      </body>
    </html>
  );
}
