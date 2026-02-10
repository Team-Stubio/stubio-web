"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import type { Locale } from "@/i18n/locales";

import { BookingCtaButton } from "@/components/site/booking-cta-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type HeroIntroProps = {
  locale: Locale;
  badge: string;
  title: string;
  description: string;
  trustLine: string;
  primaryCta: string;
  secondaryCta: string;
};

export function HeroIntro({
  locale,
  badge,
  title,
  description,
  trustLine,
  primaryCta,
  secondaryCta,
}: HeroIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      <Badge className="mx-auto mb-6">{badge}</Badge>
      <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 text-lg text-muted-foreground sm:text-xl">{description}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <BookingCtaButton locale={locale} label={primaryCta} onLanding size="lg" />
        <Button asChild size="lg" variant="outline">
          <Link href="#how-we-work" className="group">
            {secondaryCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{trustLine}</p>
    </motion.div>
  );
}
