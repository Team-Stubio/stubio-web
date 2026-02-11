"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";

import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";

type HeaderLockButtonProps = {
  locale: Locale;
  isAuthenticated: boolean;
  loginLabel: string;
};

export function HeaderLockButton({ locale, isAuthenticated, loginLabel }: HeaderLockButtonProps) {
  const pathname = usePathname() ?? "";
  const isOnWorkspaceRoute =
    pathname === `/${locale}/workspace` || pathname.startsWith(`/${locale}/workspace/`);

  if (!isAuthenticated) {
    return (
      <Button
        asChild
        variant="outline"
        size="icon"
        className="h-10 w-10 cursor-pointer rounded-xl border-border/80 bg-background/95 shadow-none transition-transform hover:border-primary/50 hover:bg-card active:translate-y-0 focus-visible:ring-primary/50"
      >
        <Link href={`/${locale}/login`} aria-label={loginLabel} title={loginLabel}>
          <Lock className="h-3.5 w-3.5" />
        </Link>
      </Button>
    );
  }

  if (isOnWorkspaceRoute) {
    return (
      <form action="/auth/logout" method="post">
        <input type="hidden" name="locale" value={locale} />
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="h-10 w-10 cursor-pointer rounded-xl border-border/80 bg-background/95 shadow-none transition-transform hover:border-primary/50 hover:bg-card active:translate-y-0 focus-visible:ring-primary/50"
          aria-label="Logout"
          title="Logout"
        >
          <Lock className="h-3.5 w-3.5" />
        </Button>
      </form>
    );
  }

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="h-10 w-10 cursor-pointer rounded-xl border-border/80 bg-background/95 shadow-none transition-transform hover:border-primary/50 hover:bg-card active:translate-y-0 focus-visible:ring-primary/50"
    >
      <Link href={`/${locale}/workspace?tab=overview`} aria-label={loginLabel} title={loginLabel}>
        <Lock className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );
}
