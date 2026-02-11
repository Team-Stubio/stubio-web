import { NextResponse } from "next/server";

import { isLocale } from "@/i18n/locales";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

function redirectTo(request: Request, pathname: string) {
  const url = new URL(pathname, request.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const localeInput = String(formData.get("locale") ?? "en");
  const locale = isLocale(localeInput) ? localeInput : "en";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore sign-out failures and still redirect to login.
    }
  }

  return redirectTo(request, `/${locale}/login`);
}
