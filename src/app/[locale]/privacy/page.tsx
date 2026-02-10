import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SimpleHeader } from "@/components/site/simple-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: `${copy.privacy.title} | Stubio`,
    description: copy.privacy.content,
  };
}

export default async function LocalizedPrivacyPage({
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
      <SimpleHeader locale={currentLocale} nav={copy.nav} path="privacy" />
      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{copy.privacy.title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>{copy.privacy.updated}</p>
            <p>{copy.privacy.content}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
