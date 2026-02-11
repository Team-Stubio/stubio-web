"use client";

import { type FormEvent, useState } from "react";
import { AlertCircle, Lock, Mail } from "lucide-react";

import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginErrorCode = "missing_credentials" | "invalid_credentials" | "server_error";

type LoginFormCopy = {
  email: string;
  password: string;
  submit: string;
  errorMissingCredentials: string;
  errorInvalidCredentials: string;
  errorServer: string;
  errorGeneric: string;
};

type LoginFormProps = {
  locale: Locale;
  copy: LoginFormCopy;
  initialEmail?: string;
  initialErrorCode?: LoginErrorCode | null;
};

type LoginResponse =
  | { ok: true; redirectTo: string }
  | { ok: false; code?: LoginErrorCode };

export function LoginForm({
  locale,
  copy,
  initialEmail = "",
  initialErrorCode = null,
}: LoginFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState<LoginErrorCode | null>(initialErrorCode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorMessage =
    errorCode === "missing_credentials"
      ? copy.errorMissingCredentials
      : errorCode === "invalid_credentials"
        ? copy.errorInvalidCredentials
        : errorCode === "server_error"
          ? copy.errorServer
          : null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorCode(null);

    try {
      const body = new FormData();
      body.set("email", email.trim().toLowerCase());
      body.set("password", password);
      body.set("locale", locale);

      const response = await fetch("/auth/login", {
        method: "POST",
        body,
        headers: {
          "x-stubio-client": "1",
        },
      });

      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.ok) {
        setErrorCode(result.ok ? "invalid_credentials" : (result.code ?? "invalid_credentials"));
        setIsSubmitting(false);
        return;
      }

      window.location.assign(result.redirectTo);
    } catch {
      setErrorCode("invalid_credentials");
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      {errorCode ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{errorMessage ?? copy.errorGeneric}</p>
        </div>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="email">{copy.email}</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            className={`pl-9 ${errorCode ? "border-destructive/50 focus-visible:ring-destructive/50" : ""}`}
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errorCode)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{copy.password}</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className={`pl-9 ${errorCode ? "border-destructive/50 focus-visible:ring-destructive/50" : ""}`}
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(errorCode)}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "..." : copy.submit}
      </Button>
    </form>
  );
}
