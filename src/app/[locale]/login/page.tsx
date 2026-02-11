import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { copyByLocale } from "@/i18n/copy";
import { isLocale, type Locale } from "@/i18n/locales";
import { getAuthenticatedUser } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const targetLocale = isLocale(locale) ? locale : "en";
  const copy = copyByLocale[targetLocale];

  return {
    title: `${copy.login.title} | Stubio`,
    description: copy.login.subtitle,
  };
}

export default async function LocalizedLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const copy = copyByLocale[currentLocale];
  const user = await getAuthenticatedUser();

  if (user) {
    redirect(`/${currentLocale}/workspace?tab=overview`);
  }

  const resolvedSearchParams = await searchParams;
  const initialErrorCode =
    resolvedSearchParams.error === "invalid_credentials" ||
    resolvedSearchParams.error === "missing_credentials"
      ? resolvedSearchParams.error
      : null;
  const submittedEmail = resolvedSearchParams.email?.trim() ?? "";

  return (
    <div>
      <SiteHeader locale={currentLocale} nav={copy.nav} />
      <main className="mx-auto grid min-h-[calc(100dvh-65px)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-border/70 bg-card/95">
          <CardHeader>
            <Badge className="mb-3 w-fit">Stubio Workspace</Badge>
            <CardTitle className="text-2xl">{copy.login.title}</CardTitle>
            <CardDescription>{copy.login.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm
              locale={currentLocale}
              initialEmail={submittedEmail}
              initialErrorCode={initialErrorCode}
              copy={{
                email: copy.login.email,
                password: copy.login.password,
                submit: copy.login.submit,
                errorMissingCredentials:
                  currentLocale === "da"
                    ? "Indtast både email og adgangskode."
                    : "Please enter both email and password.",
                errorInvalidCredentials:
                  currentLocale === "da"
                    ? "Forkert email eller adgangskode. Prøv igen."
                    : "Incorrect email or password. Please try again.",
                errorGeneric:
                  currentLocale === "da"
                    ? "Login mislykkedes. Prøv igen."
                    : "Login failed. Please try again.",
              }}
            />
            <p className="mt-4 text-xs text-muted-foreground">{copy.login.demoHint}</p>
            <Button asChild variant="ghost" className="mt-3">
              <Link href={`/${currentLocale}`}>
                <ArrowLeft className="h-4 w-4" />
                {copy.login.back}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
