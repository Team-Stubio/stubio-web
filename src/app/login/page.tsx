import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { copyByLocale } from "@/i18n/copy";
import { getAuthenticatedUser } from "@/lib/auth";

const copy = copyByLocale.en;

export const metadata: Metadata = {
  title: `${copy.login.title} | Stubio`,
  description: copy.login.subtitle,
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect("/en/workspace?tab=overview");
  }

  const params = await searchParams;
  const initialErrorCode =
    params.error === "invalid_credentials" ||
    params.error === "missing_credentials" ||
    params.error === "server_error"
      ? params.error
      : null;
  const submittedEmail = params.email?.trim() ?? "";

  return (
    <div>
      <SiteHeader locale="en" nav={copy.nav} />
      <main className="mx-auto grid min-h-[calc(100dvh-65px)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-border/70 bg-card/95">
          <CardHeader>
            <Badge className="mb-3 w-fit">Stubio Workspace</Badge>
            <CardTitle className="text-2xl">{copy.login.title}</CardTitle>
            <CardDescription>{copy.login.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm
              locale="en"
              initialEmail={submittedEmail}
              initialErrorCode={initialErrorCode}
              copy={{
                email: copy.login.email,
                password: copy.login.password,
                submit: copy.login.submit,
                errorMissingCredentials: "Please enter both email and password.",
                errorInvalidCredentials: "Incorrect email or password. Please try again.",
                errorServer: "Login service is currently unavailable. Please try again shortly.",
                errorGeneric: "Login failed. Please try again.",
              }}
            />
            <p className="mt-4 text-xs text-muted-foreground">{copy.login.demoHint}</p>
            <Button asChild variant="ghost" className="mt-3">
              <Link href="/en">
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
