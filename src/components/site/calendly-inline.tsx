"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { withThemeCalendlyUrl } from "@/lib/calendly";

type CalendlyInlineProps = {
  url: string;
  title: string;
};

const CALENDLY_FIXED_HEIGHT = 602;

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function CalendlyInline({ url, title }: CalendlyInlineProps) {
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const [readyUrl, setReadyUrl] = useState<string | null>(null);
  const [visibleUrl, setVisibleUrl] = useState<string | null>(null);
  const embedDomain =
    hydrated && typeof window !== "undefined" ? window.location.host : undefined;
  const themedUrl = useMemo(
    () => withThemeCalendlyUrl(url, resolvedTheme === "dark", embedDomain),
    [url, resolvedTheme, embedDomain],
  );
  const isReady = readyUrl === themedUrl;
  const isVisible = visibleUrl === themedUrl;

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (
        typeof event.origin === "string" &&
        event.origin.includes("calendly.com") &&
        event.data &&
        typeof event.data === "object" &&
        "event" in event.data &&
        typeof event.data.event === "string" &&
        event.data.event.startsWith("calendly.")
      ) {
        setReadyUrl((current) => (current === themedUrl ? current : themedUrl));
      }
    };

    // Fallback so the widget still appears if postMessage events are blocked/changed.
    const fallbackTimer = window.setTimeout(() => {
      setReadyUrl((current) => (current === themedUrl ? current : themedUrl));
    }, 4000);

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(fallbackTimer);
    };
  }, [hydrated, themedUrl]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    // Keep placeholder visible briefly so white internal spinner is less noticeable.
    const revealTimer = window.setTimeout(() => {
      setVisibleUrl((current) => (current === themedUrl ? current : themedUrl));
    }, 1500);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [isReady, themedUrl]);

  return (
    <div
      className="calendly-fixed relative w-full min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card"
      style={{ height: `${CALENDLY_FIXED_HEIGHT}px` }}
    >
      <div
        className={`absolute inset-0 bg-card transition-opacity duration-300 ${
          isVisible ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <div className="calendly-shimmer h-full w-full" />
      </div>
      {hydrated ? (
        <iframe
          key={themedUrl}
          src={themedUrl}
          title={title}
          className={`relative h-full w-full border-0 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ minWidth: "320px", backgroundColor: "hsl(var(--card))" }}
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full bg-card" aria-hidden />
      )}
    </div>
  );
}
