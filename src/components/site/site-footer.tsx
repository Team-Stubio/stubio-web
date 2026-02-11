import { MapPin } from "lucide-react";
import Link from "next/link";

import type { SiteCopy } from "@/i18n/copy";
import type { Locale } from "@/i18n/locales";

import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  locale: Locale;
  footer: SiteCopy["footer"];
  themeLabel: string;
};

export function SiteFooter({ locale, footer, themeLabel }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Logo locale={locale} />
          <ThemeToggle label={themeLabel} />
        </div>
        <div className="grid gap-8 text-sm text-muted-foreground md:grid-cols-[1.65fr_1.35fr]">
          <div>
            <p className="mb-3 max-w-md leading-relaxed">{footer.about}</p>
            <p className="inline-flex items-center gap-2 font-medium text-foreground">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-3 w-3 fill-current" />
              </span>
              {footer.city}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:justify-self-end">
            <div className="md:justify-self-end">
              <p className="font-medium text-foreground">{footer.explore}</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href={`/${locale}#how-we-work`}
                  className="hover:text-primary"
                >
                  {footer.howWeWork}
                </Link>
                <Link
                  href={`/${locale}#projects`}
                  className="hover:text-primary"
                >
                  {footer.projects}
                </Link>
                <Link href={`/${locale}#faq`} className="hover:text-primary">
                  {footer.faq}
                </Link>
                <Link
                  href={`/${locale}/privacy`}
                  className="hover:text-primary"
                >
                  {footer.privacy}
                </Link>
                <Link href={`/${locale}/terms`} className="hover:text-primary">
                  {footer.terms}
                </Link>
              </div>
            </div>
            <div className="md:justify-self-end">
              <p className="font-medium text-foreground">{footer.contact}</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="hover:text-primary"
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  {footer.linkedin}
                </a>
                <Link href="#book-meeting" className="hover:text-primary">
                  {footer.calendly}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} Stubio. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
