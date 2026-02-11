import {
  AppWindow,
  ArrowRight,
  Bug,
  Check,
  Code2,
  CreditCard,
  Database,
  Heart,
  LayoutDashboard,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

import type { SiteCopy } from "@/i18n/copy";
import type { Locale } from "@/i18n/locales";

import { CalendlyInline } from "@/components/site/calendly-inline";
import { DesignDiff } from "@/components/site/design-diff";
import { GlitchCodePreview } from "@/components/site/glitch-code-preview";
import { HeroIntro } from "@/components/site/hero-intro";
import { HoverLift } from "@/components/site/hover-lift";
import { SectionReveal } from "@/components/site/section-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { highlightCode } from "@/lib/highlight";
import { siteConfig } from "@/lib/site-config";

const serviceIcons = [AppWindow, Smartphone, Heart, Database];
const stackIcons = [Code2, LayoutDashboard, CreditCard, Database];
const processMockups = [
  "/placeholders/process-1.svg",
  "/placeholders/process-2.svg",
  "/placeholders/process-3.svg",
  "/placeholders/process-4.svg",
];

const codeSnippet = `type BookingRequest = {
  company: string;
  goal: "launch" | "scale";
  budgetRange: "30-60k" | "60k+";
};

export async function createPlan(input: BookingRequest) {
  const insights = await researchService.getUserSignals(input.company);

  return roadmapBuilder
    .fromInsights(insights)
    .withMilestones(["Design", "Build", "Launch"])
    .withWeeklyDocumentation(true)
    .build();
}`;

const goodSnippet = `type User = { id: string; email: string };

app.get("/user/:id", async (req, res) => {
  const user = await db.users.find<User>(req.params.id);

  if (!user) return res.sendStatus(404);

  res.json({ email: user.email });
});`;

const badSnippet = `app.get("/user/:id",(r,s)=>(
  r&&r.params&&r.params.id
    ? db.users.find(r.params.id)
        .then(u=>u
          ? (u.email
              ? s.status(500).send("bad user"))
          : s.status(404).send("no user"))
    : s.status(400).send("no id")
));`;

type LandingContentProps = {
  locale: Locale;
  copy: SiteCopy;
};

export async function LandingContent({ locale, copy }: LandingContentProps) {
  const [badSnippetHtml, goodSnippetHtml, codeSnippetHtml] = await Promise.all([
    highlightCode(badSnippet, "js"),
    highlightCode(goodSnippet, "js"),
    highlightCode(codeSnippet, "ts"),
  ]);

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden pb-20 pt-20 sm:pt-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.22),transparent_42%),radial-gradient(circle_at_85%_8%,hsl(var(--accent)/0.16),transparent_34%)]" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <HeroIntro
            locale={locale}
            title={copy.hero.title}
            description={copy.hero.description}
            trustLine={copy.hero.trustLine}
            primaryCta={copy.hero.primaryCta}
            secondaryCta={copy.hero.secondaryCta}
            roleDesigner={copy.hero.roleDesigner}
            roleDeveloper={copy.hero.roleDeveloper}
          />
        </div>
      </section>

      <SectionReveal>
        <section
          id="social-proof"
          aria-label={copy.socialProof.title}
          className="py-8"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-center text-sm text-muted-foreground">
              {copy.socialProof.title}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {copy.socialProof.logos.map((logo) => (
                <div
                  key={logo}
                  className="flex h-14 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-sm font-medium text-muted-foreground"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="services" className="py-16" aria-labelledby="services-title">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <h2
                id="services-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.services.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.services.description}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {copy.services.items.map((service, index) => {
                const Icon = serviceIcons[index] ?? AppWindow;

                return (
                  <HoverLift key={service.title}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="flex flex-wrap gap-2">
                          {service.points.map((point) => (
                            <Badge key={point} variant="secondary">
                              {point}
                            </Badge>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </HoverLift>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section
          id="how-we-work"
          className="py-16"
          aria-labelledby="process-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2
                id="process-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.process.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.process.description}
              </p>
            </div>
            <ol className="my-18 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {copy.process.steps.map((step, index) => {
                const [firstToken, ...restTokens] = step.title.split(" ");
                const hasLeadingIndex = /^\d+$/.test(firstToken);
                const indexLabel = hasLeadingIndex
                  ? firstToken
                  : String(index + 1).padStart(2, "0");
                const titleLabel = hasLeadingIndex
                  ? restTokens.join(" ")
                  : step.title;

                return (
                  <li key={step.title}>
                    <div className="h-full">
                      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/70 shadow-md shadow-black/10">
                        <Image
                          src={processMockups[index % processMockups.length]}
                          alt={`${titleLabel} mockup`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-2xl font-bold leading-none text-primary">
                        {indexLabel}
                      </span>
                      <h3 className="pt-2 text-base font-semibold">
                        {titleLabel}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section
          id="design"
          className="py-16"
          aria-labelledby="design-diff-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2
                id="design-diff-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.design.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.design.description}
              </p>
            </div>
            <DesignDiff
              beforeLabel={copy.design.beforeLabel}
              afterLabel={copy.design.afterLabel}
            />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="code" className="py-16" aria-labelledby="code-title">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
            <div>
              <h2
                id="code-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.code.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.code.description}
              </p>
              <Button
                asChild
                variant="ghost"
                className="mt-4 h-auto p-0 text-primary hover:bg-transparent"
              >
                <a
                  href="#book-meeting"
                  className="group inline-flex items-center gap-2"
                >
                  {copy.booking.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
            </div>
            <Card className="overflow-hidden border-primary/30 bg-[#173026] text-emerald-100">
              <CardContent className="p-0">
                <div
                  className="code-preview overflow-x-auto text-emerald-50"
                  dangerouslySetInnerHTML={{ __html: codeSnippetHtml }}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section
          id="comparison"
          className="py-16"
          aria-labelledby="comparison-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2
                id="comparison-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.comparison.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.comparison.description}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="h-full min-w-0 border-red-600/40 bg-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    {copy.comparison.bad.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="ml-4 space-y-3 text-sm text-muted-foreground">
                    {copy.comparison.bad.points.map((point) => (
                      <li key={point}>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <GlitchCodePreview
                    className="bad-code-preview code-preview mt-6 w-full max-w-full overflow-x-auto rounded-xl border border-red-500/35 text-red-200"
                    html={badSnippetHtml}
                  />
                </CardContent>
              </Card>
              <Card className="h-full min-w-0 border-primary/35 bg-background/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Check className="h-5 w-5" />
                    {copy.comparison.good.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="ml-4 space-y-3 text-sm text-muted-foreground">
                    {copy.comparison.good.points.map((point) => (
                      <li key={point}>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="code-preview mt-6 w-full max-w-full overflow-x-auto rounded-xl border border-border/70 text-emerald-50"
                    dangerouslySetInnerHTML={{ __html: goodSnippetHtml }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section
          id="book-meeting"
          className="py-16"
          aria-labelledby="booking-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-primary/35 bg-card/95">
              <div className="grid gap-6 p-6 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
                <div className="relative space-y-5 pb-20">
                  <Badge>{copy.nav.book}</Badge>
                  <h2
                    id="booking-title"
                    className="text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {copy.booking.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {copy.booking.description}
                  </p>
                  <Image
                    src="/images/coffee.png"
                    alt=""
                    width={140}
                    height={140}
                    aria-hidden
                    className="pointer-events-none absolute -bottom-5 -left-10 w-48 select-none object-contain opacity-95 sm:w-56"
                  />
                </div>
                <div className="w-full max-w-[500px] lg:justify-self-end">
                  <CalendlyInline
                    url={siteConfig.calendlyUrl}
                    title={copy.booking.embedTitle}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section
          id="projects"
          className="py-16"
          aria-labelledby="projects-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2
                id="projects-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.projects.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.projects.description}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {copy.projects.items.map((project) => (
                <HoverLift key={project.title}>
                  <Card className="h-full overflow-hidden">
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="outline" className="mb-2 w-fit">
                        {project.tag}
                      </Badge>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.outcome}</CardDescription>
                    </CardHeader>
                  </Card>
                </HoverLift>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="stack" className="py-16" aria-labelledby="stack-title">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2
                id="stack-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {copy.stack.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {copy.stack.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {copy.stack.tools.map((tool, index) => {
                const Icon = stackIcons[index % stackIcons.length];

                return (
                  <div
                    key={tool}
                    className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-3 py-2"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{tool}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="faq" className="pb-8 pt-16" aria-labelledby="faq-title">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2
              id="faq-title"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {copy.faq.title}
            </h2>
            <Accordion
              type="single"
              collapsible
              className="mt-6 rounded-2xl border border-border/70 bg-card/80 px-6"
            >
              {copy.faq.items.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
