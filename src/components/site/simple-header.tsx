import Link from "next/link";

import type { Locale } from "@/i18n/locales";
import type { SiteCopy } from "@/i18n/copy";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";

type SimpleHeaderProps = {
  locale: Locale;
  nav: SiteCopy["nav"];
};

export function SimpleHeader({ locale, nav }: SimpleHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo locale={locale} />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href={`/${locale}`}>{nav.book}</Link>
          </Button>
          <LanguageSwitcher locale={locale} />
          <ThemeToggle label={nav.theme} />
        </div>
      </div>
    </header>
  );
}
