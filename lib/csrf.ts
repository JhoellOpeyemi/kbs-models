import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const CSRF_COOKIE_NAME = "__Host-kbs-csrf";

const DEVELOPMENT_CSRF_SECRET = "development-only-csrf-secret";

function getCsrfSecret(): string {
  if (process.env.CSRF_SECRET) {
    return process.env.CSRF_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    return DEVELOPMENT_CSRF_SECRET;
  }

  throw new Error("CSRF_SECRET environment variable is not configured");
}

export function generateCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export function signCsrfToken(token: string): string {
  return createHmac("sha256", getCsrfSecret()).update(token).digest("hex");
}

export function attachCsrfCookie(
  response: NextResponse,
  token: string,
): NextResponse {
  response.cookies.set({
    name: CSRF_COOKIE_NAME,
    value: signCsrfToken(token),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

export function verifyCsrfToken(
  token: string | null | undefined,
  cookieValue: string | undefined,
): boolean {
  if (!token || !cookieValue) {
    return false;
  }

  const expected = signCsrfToken(token);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(cookieValue);

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export function getCookieValue(
  cookieHeader: string | null,
  name: string,
): string | undefined {
  if (!cookieHeader) {
    return undefined;
  }

  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined;
}
