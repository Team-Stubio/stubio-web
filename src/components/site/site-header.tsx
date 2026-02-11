import Link from "next/link";

import type { SiteCopy } from "@/i18n/copy";
import type { Locale } from "@/i18n/locales";

import { BookingCtaButton } from "@/components/site/booking-cta-button";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  locale: Locale;
  nav: SiteCopy["nav"];
};

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo locale={locale} />
          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="#how-we-work">{nav.howWeWork}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="#design">{nav.design}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="#code">{nav.code}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="#projects">{nav.projects}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="#faq">{nav.faq}</Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle label={nav.theme} />
          <BookingCtaButton
            locale={locale}
            onLanding
            label={nav.book}
            className="hidden sm:inline-flex min-w-34"
          />
        </div>
      </div>
    </header>
  );
}
