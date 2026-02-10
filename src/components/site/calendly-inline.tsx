"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTheme } from "next-themes";

type CalendlyInlineProps = {
  url: string;
  title: string;
};

const CALENDLY_FIXED_HEIGHT = 600;

function withThemeColors(baseUrl: string, isDark: boolean) {
  const themed = new URL(baseUrl);

  if (isDark) {
    themed.searchParams.set("background_color", "0b1612");
    themed.searchParams.set("text_color", "e5f5ed");
    themed.searchParams.set("primary_color", "36bf84");
  } else {
    themed.searchParams.set("background_color", "ffffff");
    themed.searchParams.set("text_color", "27312c");
    themed.searchParams.set("primary_color", "288f53");
  }

  return themed.toString();
}

export function CalendlyInline({ url, title }: CalendlyInlineProps) {
  const { resolvedTheme } = useTheme();
  const [themedUrl, setThemedUrl] = useState<string | null>(null);

  useEffect(() => {
    setThemedUrl(withThemeColors(url, resolvedTheme === "dark"));
  }, [url, resolvedTheme]);

  return (
    <div
      className="calendly-fixed w-full min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card"
      style={{ height: `${CALENDLY_FIXED_HEIGHT}px` }}
    >
      {themedUrl ? (
        <>
          <div
            key={themedUrl}
            className="calendly-inline-widget h-full w-full"
            data-url={themedUrl}
            style={{ minWidth: "320px", height: "100%" }}
            title={title}
            aria-label={title}
          />
          <Script
            id="calendly-widget-script"
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </>
      ) : (
        <div className="h-full w-full" aria-hidden />
      )}
    </div>
  );
}
