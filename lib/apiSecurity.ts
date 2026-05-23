import { NextResponse } from "next/server";
import { CSRF_COOKIE_NAME, getCookieValue, verifyCsrfToken } from "@/lib/csrf";
import { brandTokens } from "@/lib/designTokens";
import { logSecurityEvent } from "@/lib/logging";

type ExpectedContentType = "application/json" | "multipart/form-data";

interface RequestGuardOptions {
  bucket: string;
  expectedContentType: ExpectedContentType;
  limit?: number;
  windowMs?: number;
  requireCsrf?: boolean;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const DEFAULT_ALLOWED_ORIGINS = [...brandTokens.websiteOrigins];

declare global {
  var __kbsRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const rateLimitStore =
  globalThis.__kbsRateLimitStore ?? new Map<string, RateLimitEntry>();

if (!globalThis.__kbsRateLimitStore) {
  globalThis.__kbsRateLimitStore = rateLimitStore;
}

function getAllowedOrigins(request: Request): Set<string> {
  const allowedOrigins = new Set<string>(DEFAULT_ALLOWED_ORIGINS);
  const requestOrigin = new URL(request.url).origin;
  const configuredOrigins = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  allowedOrigins.add(requestOrigin);

  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }

  configuredOrigins?.forEach((origin) => allowedOrigins.add(origin));

  return allowedOrigins;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp || "unknown";
}

function reject(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

function validateOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");

  if (!origin || !getAllowedOrigins(request).has(origin)) {
    logSecurityEvent("invalid_origin", {
      endpoint: new URL(request.url).pathname,
      origin,
    });
    return reject("Unauthorized origin", 403);
  }

  return null;
}

function validateContentType(
  request: Request,
  expectedContentType: ExpectedContentType,
): NextResponse | null {
  const contentType = request.headers.get("content-type")?.toLowerCase();

  if (!contentType?.includes(expectedContentType)) {
    return reject(
      `Invalid Content-Type. Expected ${expectedContentType}.`,
      400,
    );
  }

  return null;
}

function validateCsrf(request: Request): NextResponse | null {
  const csrfToken = request.headers.get("x-csrf-token");
  const csrfCookie = getCookieValue(
    request.headers.get("cookie"),
    CSRF_COOKIE_NAME,
  );

  try {
    if (!verifyCsrfToken(csrfToken, csrfCookie)) {
      logSecurityEvent("csrf_validation_failed", {
        endpoint: new URL(request.url).pathname,
        hasToken: Boolean(csrfToken),
        hasCookie: Boolean(csrfCookie),
      });
      return reject("Invalid CSRF token", 403);
    }
  } catch {
    return reject("Server configuration error", 500);
  }

  return null;
}

function enforceRateLimit(
  request: Request,
  bucket: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const key = `${bucket}:${getClientIp(request)}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (entry.count >= limit) {
    logSecurityEvent("rate_limit_exceeded", {
      bucket,
      endpoint: new URL(request.url).pathname,
      key,
    });
    return reject("Too many requests. Please try again later.", 429);
  }

  entry.count += 1;
  return null;
}

export function guardApiRequest(
  request: Request,
  {
    bucket,
    expectedContentType,
    limit = 5,
    windowMs = 60 * 60 * 1000,
    requireCsrf = true,
  }: RequestGuardOptions,
): NextResponse | null {
  const originError = validateOrigin(request);
  if (originError) {
    return originError;
  }

  const contentTypeError = validateContentType(request, expectedContentType);
  if (contentTypeError) {
    return contentTypeError;
  }

  if (requireCsrf) {
    const csrfError = validateCsrf(request);
    if (csrfError) {
      return csrfError;
    }
  }

  return enforceRateLimit(request, bucket, limit, windowMs);
}
