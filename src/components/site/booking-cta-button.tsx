import Link from "next/link";

import type { Locale } from "@/i18n/locales";

import { Button } from "@/components/ui/button";

type BookingCtaButtonProps = {
  locale: Locale;
  label: string;
  onLanding?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
};

export function BookingCtaButton({
  locale,
  label,
  onLanding = false,
  variant = "default",
  size = "default",
  className,
}: BookingCtaButtonProps) {
  const href = onLanding ? "#book-meeting" : `/${locale}#book-meeting`;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
