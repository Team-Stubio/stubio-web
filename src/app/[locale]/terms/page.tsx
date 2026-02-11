import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copyByLocale } from "@/i18n/copy";
import { isLocale, type Locale } from "@/i18n/locales";

const termsBody = {
  en: {
    title: "Terms",
    updated: "Updated: February 10, 2026",
    content:
      "This is a placeholder terms page. Add your complete legal terms before production launch.",
  },
  da: {
    title: "Vilkår",
    updated: "Opdateret: 10. februar 2026",
    content:
      "Dette er en placeholder for vilkår. Tilføj komplette juridiske vilkår før siden går i produktion.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const targetLocale = isLocale(locale) ? locale : "en";

  return {
    title: `${termsBody[targetLocale].title} | Stubio`,
    description: termsBody[targetLocale].content,
  };
}

export default async function LocalizedTermsPage({
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
    <div>
      <SiteHeader locale={currentLocale} nav={copy.nav} />
      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{termsBody[currentLocale].title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>{termsBody[currentLocale].updated}</p>
            <p>{termsBody[currentLocale].content}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
