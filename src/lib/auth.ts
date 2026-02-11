import { redirect } from "next/navigation";

import type { Locale } from "@/i18n/locales";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getAuthenticatedUser() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return data.user;
  } catch {
    return null;
  }
}

export async function requireAuthenticatedUser(locale: Locale) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return user;
}
