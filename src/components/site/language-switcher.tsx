"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n/locales";

import { Button } from "@/components/ui/button";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const localePrefix = normalizedPath.match(/^\/(en|da)(?=\/|$)/)?.[0] ?? "";
  const pathWithoutLocale = localePrefix ? normalizedPath.slice(localePrefix.length) || "/" : normalizedPath;
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  const daHref = `/da${suffix}`;
  const enHref = `/en${suffix}`;

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-background/75 p-1">
      <Button
        asChild
        variant={locale === "da" ? "secondary" : "ghost"}
        size="sm"
        className={`h-8 rounded-lg px-2.5 text-xs ${locale === "da" ? "" : "hover:bg-card"}`}
      >
        <Link href={daHref} aria-label="Switch to Danish">
          DA
        </Link>
      </Button>
      <Button
        asChild
        variant={locale === "en" ? "secondary" : "ghost"}
        size="sm"
        className={`h-8 rounded-lg px-2.5 text-xs ${locale === "en" ? "" : "hover:bg-card"}`}
      >
        <Link href={enHref} aria-label="Switch to English">
          EN
        </Link>
      </Button>
    </div>
  );
}
