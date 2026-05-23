export const brandTokens = {
  agencyName: "KBS Models",
  agencyShortName: "KBS",
  academyName: "KBS Models Academy",
  agencyTeamName: "KBS Models Team",
  agencyEmail: "info@kbsmodels.com",
  websiteOrigins: [
    "https://kbsmodels.com",
    "https://www.kbsmodels.com",
    "https://kbsmodels.vercel.app",
  ],
} as const;

export const buildAgencyPageTitle = (pageTitle: string | null) =>
  `${pageTitle || "Model"} | ${brandTokens.agencyName}`;
