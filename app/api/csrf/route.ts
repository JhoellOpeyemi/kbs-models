import { NextResponse } from "next/server";
import { attachCsrfCookie, generateCsrfToken } from "@/lib/csrf";
import { logError } from "@/lib/logging";

export async function GET() {
  try {
    const token = generateCsrfToken();
    const response = NextResponse.json(
      { token },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );

    return attachCsrfCookie(response, token);
  } catch (error) {
    logError(
      { endpoint: "/api/csrf", action: "issue_csrf_token" },
      error,
      "Failed to issue CSRF token",
    );

    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }
}
