import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

import { SimpleHeader } from "@/components/site/simple-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyByLocale } from "@/i18n/copy";

const copy = copyByLocale.en;

export const metadata: Metadata = {
  title: `${copy.login.title} | Stubio`,
  description: copy.login.subtitle,
};

export default function LoginPage() {
  return (
    <div>
      <SimpleHeader locale="en" nav={copy.nav} path="login" />
      <main className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-border/70 bg-card/95">
          <CardHeader>
            <Badge className="mb-3 w-fit">Stubio Workspace</Badge>
            <CardTitle className="text-2xl">{copy.login.title}</CardTitle>
            <CardDescription>{copy.login.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action="#" method="post">
              <div className="space-y-2">
                <Label htmlFor="email">{copy.login.email}</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="name@company.com" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{copy.login.password}</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-9" />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {copy.login.submit}
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">{copy.login.demoHint}</p>
            <Button asChild variant="ghost" className="mt-3 px-0">
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
