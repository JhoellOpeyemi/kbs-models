/**
 * SECURITY: Structured logging utility
 * Prevents accidental logging of sensitive data (PII, emails, phone numbers, etc.)
 */

export interface LogContext {
  requestId?: string;
  endpoint?: string;
  method?: string;
  timestamp?: string;
  [key: string]: unknown;
}

/**
 * Mask sensitive data in error messages and logs
 * Prevents PII from leaking into logs
 * 
 * @param text - Text that might contain sensitive data
 * @returns Masked version of the text
 */
export function maskSensitiveData(text: string): string {
  if (!text || typeof text !== "string") return text;

  // Mask email addresses
  text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL_MASKED]");

  // Mask phone numbers (various formats)
  text = text.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[PHONE_MASKED]");
  text = text.replace(/\b\d{10}\b/g, "[PHONE_MASKED]");

  // Mask API keys and tokens (look for common patterns)
  text = text.replace(/sk_[a-zA-Z0-9]+/g, "[API_KEY_MASKED]");
  text = text.replace(/pk_[a-zA-Z0-9]+/g, "[API_KEY_MASKED]");
  text = text.replace(/token[=:]\s*[a-zA-Z0-9._-]+/g, "[TOKEN_MASKED]");

  // Mask URLs with sensitive query parameters
  text = text.replace(/[?&](password|token|key|secret|apikey)=[^&]*/gi, "[$1=MASKED]");

  // Mask credit card patterns (basic)
  text = text.replace(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, "[CARD_MASKED]");

  return text;
}

/**
 * Safe error logging that masks PII
 * 
 * @param context - Request context (endpoint, method, etc.)
 * @param error - Error object
 * @param message - Optional message
 */
export function logError(
  context: LogContext,
  error: unknown,
  message?: string
): void {
  if (process.env.NODE_ENV === "production") {
    // In production, log to external service, not console
    // For now, just log safely
    const errorMessage = error instanceof Error ? error.message : String(error);
    const maskedMessage = maskSensitiveData(errorMessage);

    console.error(
      JSON.stringify({
        level: "error",
        message: message || "An error occurred",
        error: maskedMessage,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
        },
      })
    );
  } else {
    // In development, log more details for debugging
    console.error(`[ERROR] ${message || "An error occurred"}`, {
      error,
      context: {
        ...context,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

/**
 * Safe debug logging (development only)
 * 
 * @param context - Request context
 * @param message - Debug message
 * @param data - Optional data to log
 */
export function logDebug(
  context: LogContext,
  message: string,
  data?: unknown
): void {
  if (process.env.NODE_ENV === "development") {
    console.debug(
      JSON.stringify({
        level: "debug",
        message,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
        },
      }),
      data
    );
  }
}

/**
 * Safe warning logging
 * 
 * @param context - Request context
 * @param message - Warning message
 * @param data - Optional data to log
 */
export function logWarn(
  context: LogContext,
  message: string,
  data?: unknown
): void {
  const newData = data ? maskSensitiveData(JSON.stringify(data)) : undefined;

  console.warn(
    JSON.stringify({
      level: "warn",
      message,
      context: {
        ...context,
        timestamp: new Date().toISOString(),
      },
    }),
    newData
  );
}

/**
 * Log security-related events without PII
 * 
 * @param event - Security event type
 * @param details - Event details (will mask PII)
 */
export function logSecurityEvent(
  event: string,
  details?: Record<string, unknown>
): void {
  const maskedDetails = details
    ? JSON.parse(maskSensitiveData(JSON.stringify(details)))
    : undefined;

  console.warn(
    JSON.stringify({
      level: "warn",
      type: "security_event",
      event,
      details: maskedDetails,
      timestamp: new Date().toISOString(),
    })
  );
}
