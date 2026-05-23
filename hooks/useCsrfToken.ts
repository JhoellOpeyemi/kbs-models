"use client";

import { useEffect, useState } from "react";

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadCsrfToken() {
      try {
        const response = await fetch("/api/csrf", {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }

        const data = (await response.json()) as { token?: string };

        if (!isMounted || !data.token) {
          return;
        }

        setCsrfToken(data.token);
      } catch {
        if (isMounted) {
          setError("Unable to secure the form. Please refresh and try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCsrfToken();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { csrfToken, isLoading, error };
}
