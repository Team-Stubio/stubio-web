"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Caveat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/locales";

import { BookingCtaButton } from "@/components/site/booking-cta-button";
import { Button } from "@/components/ui/button";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type HeroIntroProps = {
  locale: Locale;
  title: string;
  description: string;
  trustLine: string;
  primaryCta: string;
  secondaryCta: string;
  roleDesigner: string;
  roleDeveloper: string;
};

function DrawnWord({ word, startDelay }: { word: string; startDelay: number }) {
  const letters = Array.from(word);

  return (
    <span className="inline-flex">
      {letters.map((letter, index) => {
        const char = letter === " " ? "\u00A0" : letter;
        const strokeDelay = startDelay + index * 0.07;
        const fillDelay = strokeDelay + 0.14;

        return (
          <span key={`${letter}-${index}`} className="relative inline-block">
            <motion.span
              aria-hidden
              className="absolute inset-0 text-transparent"
              style={{ WebkitTextStroke: "1px currentColor" }}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 0.2,
                delay: strokeDelay,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
            <motion.span
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12, delay: fillDelay, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function HeroIntro({
  locale,
  title,
  description,
  trustLine,
  primaryCta,
  secondaryCta,
  roleDesigner,
  roleDeveloper,
}: HeroIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="relative mx-auto mb-6 w-fit overflow-visible">
        <svg
          viewBox="0 0 460 150"
          className="pointer-events-none absolute left-1/2 top-[-34px] z-20 h-36 w-[460px] -translate-x-1/2 overflow-visible"
          aria-hidden
        >
          <motion.path
            d="M150 44 C 160 60, 168 66, 174 70"
            stroke="hsl(var(--foreground) / 0.82)"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 1, opacity: 0 }}
            animate={{ pathLength: 1, pathOffset: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
          <motion.path
            d="M310 44 C 300 32, 292 60, 286 70"
            stroke="hsl(var(--foreground) / 0.82)"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 1, opacity: 0 }}
            animate={{ pathLength: 1, pathOffset: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.96, ease: "easeOut" }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.74, ease: "easeOut" }}
          className={`${caveat.className} pointer-events-none absolute left-[-72px] top-[-26px] z-20 -rotate-8 text-3xl leading-none text-foreground/85`}
        >
          <DrawnWord word={roleDesigner} startDelay={0.74} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 1.44, ease: "easeOut" }}
          className={`${caveat.className} pointer-events-none absolute right-[-84px] top-[-24px] z-20 rotate-8 text-3xl leading-none text-foreground/85`}
        >
          <DrawnWord word={roleDeveloper} startDelay={1.44} />
        </motion.div>
        <div className="relative z-10 flex -space-x-2">
          <Image
            src="/avatars/kasper.png"
            alt="Kasper"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border-2 border-border/70 bg-card p-0.5 object-cover shadow-sm"
          />
          <Image
            src="/avatars/andreas.png"
            alt="Andreas"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border-2 border-border/70 bg-card p-0.5 object-cover shadow-sm"
          />
        </div>
      </div>
      <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
        {description}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <BookingCtaButton
          locale={locale}
          label={primaryCta}
          onLanding
          size="lg"
        />
        <Button asChild size="lg" variant="outline">
          <Link href="#how-we-work" className="group">
            {secondaryCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
      <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Image
          src="/images/denmark.svg"
          alt=""
          width={16}
          height={12}
          aria-hidden
          className="h-3 w-auto"
        />
        <span className="text-sm font-medium">{trustLine}</span>
      </p>
    </motion.div>
  );
}
