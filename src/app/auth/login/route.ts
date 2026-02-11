import { NextResponse } from "next/server";

import { isLocale } from "@/i18n/locales";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

type LoginErrorCode = "missing_credentials" | "invalid_credentials" | "server_error";

function redirectWithParams(
  request: Request,
  pathname: string,
  params?: Record<string, string>,
) {
  const url = new URL(pathname, request.url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return NextResponse.redirect(url, { status: 303 });
}

function isClientRequest(request: Request) {
  return request.headers.get("x-stubio-client") === "1";
}

function jsonError(code: LoginErrorCode, locale: string) {
  return NextResponse.json(
    {
      ok: false,
      code,
      locale,
    },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const localeInput = String(formData.get("locale") ?? "en");
  const locale = isLocale(localeInput) ? localeInput : "en";
  const clientRequest = isClientRequest(request);

  if (!isSupabaseConfigured()) {
    if (clientRequest) {
      return jsonError("server_error", locale);
    }

    return redirectWithParams(request, `/${locale}/login`, {
      error: "server_error",
      email,
    });
  }

  if (!email || !password) {
    if (clientRequest) {
      return jsonError("missing_credentials", locale);
    }

    return redirectWithParams(request, `/${locale}/login`, {
      error: "missing_credentials",
      email,
    });
  }

  let signInError = false;

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    signInError = Boolean(error);
  } catch {
    if (clientRequest) {
      return jsonError("server_error", locale);
    }

    return redirectWithParams(request, `/${locale}/login`, {
      error: "server_error",
      email,
    });
  }

  if (signInError) {
    if (clientRequest) {
      return jsonError("invalid_credentials", locale);
    }

    return redirectWithParams(request, `/${locale}/login`, {
      error: "invalid_credentials",
      email,
    });
  }

  if (clientRequest) {
    return NextResponse.json({
      ok: true,
      redirectTo: `/${locale}/workspace?tab=overview`,
    });
  }

  return redirectWithParams(request, `/${locale}/workspace`, {
    tab: "overview",
  });
}
