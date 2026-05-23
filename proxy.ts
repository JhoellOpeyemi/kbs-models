import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      process.env.NODE_ENV !== "production" ? "'unsafe-eval'" : "",
      "https://cdn.sanity.io",
      "https://*.sanity.io",
    ]
      .filter(Boolean)
      .join(" "),
    ["style-src", "'self'", "'unsafe-inline'"].join(" "),
    [
      "img-src",
      "'self'",
      "data:",
      "blob:",
      "https://cdn.sanity.io",
      "https:",
    ].join(" "),
    ["font-src", "'self'", "data:"].join(" "),
    [
      "connect-src",
      "'self'",
      "https://api.web3forms.com",
      "https://api.resend.com",
      "https://cdn.sanity.io",
      "https://*.sanity.io",
      process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "",
      process.env.NODE_ENV !== "production" ? "ws://localhost:3000" : "",
    ]
      .filter(Boolean)
      .join(" "),
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];

  return directives.join("; ");
}

function unauthorizedStudioResponse(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="KBS Studio"',
    },
  });
}

function isStudioAuthorized(request: NextRequest): boolean {
  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;

  if (process.env.NODE_ENV !== "production" && (!username || !password)) {
    return true;
  }

  if (!username || !password) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString(
      "utf8",
    );
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const providedUsername = decoded.slice(0, separatorIndex);
    const providedPassword = decoded.slice(separatorIndex + 1);

    return providedUsername === username && providedPassword === password;
  } catch {
    return false;
  }
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy());
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=(), payment=()",
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }

  return response;
}

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/studio") &&
    !isStudioAuthorized(request)
  ) {
    return applySecurityHeaders(unauthorizedStudioResponse());
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
