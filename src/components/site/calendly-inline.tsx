"use client";

import { useTheme } from "next-themes";
import { useMemo, useSyncExternalStore } from "react";

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
  const embedDomain =
    hydrated && typeof window !== "undefined" ? window.location.host : undefined;
  const themedUrl = useMemo(
    () => withThemeCalendlyUrl(url, resolvedTheme === "dark", embedDomain),
    [url, resolvedTheme, embedDomain],
  );

  return (
    <div
      className="calendly-fixed w-full min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card"
      style={{ height: `${CALENDLY_FIXED_HEIGHT}px` }}
    >
      {hydrated ? (
        <iframe
          key={themedUrl}
          src={themedUrl}
          title={title}
          className="h-full w-full border-0"
          style={{ minWidth: "320px" }}
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full" aria-hidden />
      )}
    </div>
  );
}
