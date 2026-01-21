"use client";

import { useEffect } from "react";

export function StatusPrefetcher() {
  useEffect(() => {
    let cancelled = false;

    const prefetch = async () => {
      try {
        const res = await fetch("/api/status/check");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        sessionStorage.setItem(
          "oryon-status-cache",
          JSON.stringify({ data, ts: Date.now() })
        );
      } catch (err) {
        // best-effort; ignore
      }
    };

    prefetch();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
