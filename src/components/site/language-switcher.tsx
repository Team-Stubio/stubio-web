import Link from "next/link";

import type { Locale } from "@/i18n/locales";

import { Button } from "@/components/ui/button";

type LanguageSwitcherProps = {
  locale: Locale;
  path?: string;
};

export function LanguageSwitcher({ locale, path = "" }: LanguageSwitcherProps) {
  const cleanPath = path ? `/${path.replace(/^\//, "")}` : "";
  const daHref = `/da${cleanPath}`;
  const enHref = `/en${cleanPath}`;

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-background/75 p-1">
      <Button
        asChild
        variant={locale === "da" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 rounded-lg px-2.5 text-xs"
      >
        <Link href={daHref} aria-label="Switch to Danish">
          DA
        </Link>
      </Button>
      <Button
        asChild
        variant={locale === "en" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 rounded-lg px-2.5 text-xs"
      >
        <Link href={enHref} aria-label="Switch to English">
          EN
        </Link>
      </Button>
    </div>
  );
}
