import type { Metadata } from "next";

import { LandingContent } from "@/components/sections/landing-content";
import { SectionHashSync } from "@/components/site/section-hash-sync";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { copyByLocale } from "@/i18n/copy";

const copy = copyByLocale.en;

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};

export default function Page() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_8%_0%,hsl(var(--primary)/0.12),transparent_32%),radial-gradient(circle_at_80%_100%,hsl(var(--secondary)/0.24),transparent_38%)]" />
      <SiteHeader locale="en" nav={copy.nav} />
      <main>
        <SectionHashSync />
        <LandingContent locale="en" copy={copy} />
      </main>
      <SiteFooter locale="en" footer={copy.footer} themeLabel={copy.nav.theme} />
    </div>
  );
}
