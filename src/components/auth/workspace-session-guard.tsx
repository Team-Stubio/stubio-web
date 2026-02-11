"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/locales";

type WorkspaceSessionGuardProps = {
  locale: Locale;
};

export function WorkspaceSessionGuard({ locale }: WorkspaceSessionGuardProps) {
  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      try {
        const response = await fetch("/auth/session", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!cancelled && response.status === 401) {
          window.location.replace(`/${locale}/login`);
        }
      } catch {
        if (!cancelled) {
          window.location.replace(`/${locale}/login`);
        }
      }
    };

    verifySession();

    const onPageShow = () => {
      verifySession();
    };

    window.addEventListener("pageshow", onPageShow);

    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [locale]);

  return null;
}
