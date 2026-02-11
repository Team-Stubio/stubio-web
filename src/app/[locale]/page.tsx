import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingContent } from "@/components/sections/landing-content";
import { SectionHashSync } from "@/components/site/section-hash-sync";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { copyByLocale } from "@/i18n/copy";
import { isLocale, type Locale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const targetLocale = isLocale(locale) ? locale : "en";
  const copy = copyByLocale[targetLocale];

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: `/${targetLocale}`,
      languages: {
        en: "/en",
        da: "/da",
      },
    },
    openGraph: {
      title: copy.metadata.title,
      description: copy.metadata.description,
      locale: targetLocale === "da" ? "da_DK" : "en_US",
    },
  };
}

export default async function LocalizedLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const copy = copyByLocale[currentLocale];

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_8%_0%,hsl(var(--primary)/0.12),transparent_32%),radial-gradient(circle_at_80%_100%,hsl(var(--secondary)/0.24),transparent_38%)]" />
      <SiteHeader locale={currentLocale} nav={copy.nav} />
      <main>
        <SectionHashSync />
        <LandingContent locale={currentLocale} copy={copy} />
      </main>
      <SiteFooter locale={currentLocale} footer={copy.footer} themeLabel={copy.nav.theme} />
    </div>
  );
}
