import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkspaceSessionGuard } from "@/components/auth/workspace-session-guard";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { copyByLocale } from "@/i18n/copy";
import { isLocale, type Locale } from "@/i18n/locales";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ResourceRecord = {
  id: string;
  title: string;
  category: string | null;
  doc_url: string;
};

type ReceiptRecord = {
  id: string;
  title: string;
  receipt_url: string;
};

type Kind = "resource" | "receipt";

function isKind(value: string): value is Kind {
  return value === "resource" || value === "receipt";
}

type DocumentCopy = {
  back: string;
  iframeTitle: string;
  openExternal: string;
};

const documentCopyByLocale: Record<Locale, DocumentCopy> = {
  en: {
    back: "Back",
    iframeTitle: "Workspace document",
    openExternal: "Open in new tab",
  },
  da: {
    back: "Tilbage",
    iframeTitle: "Workspace-dokument",
    openExternal: "Åbn i ny fane",
  },
};

export default async function WorkspaceDocumentPage({
  params,
}: {
  params: Promise<{ locale: string; kind: string; id: string }>;
}) {
  const { locale, kind, id } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (!isKind(kind)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const copy = copyByLocale[currentLocale];
  const documentCopy = documentCopyByLocale[currentLocale];
  const user = await requireAuthenticatedUser(currentLocale);
  const supabase = await createSupabaseServerClient();

  if (kind === "resource") {
    const { data, error } = await supabase
      .from("workspace_resources")
      .select("id, title, category, doc_url")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle<ResourceRecord>();

    if (error || !data) {
      notFound();
    }

    return (
      <div className="h-screen">
        <WorkspaceSessionGuard locale={currentLocale} />
        <SiteHeader locale={currentLocale} nav={copy.nav} />
        <main className="mx-auto flex h-[calc(100dvh-65px)] w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative mb-4 min-h-16 py-1">
            <Button
              asChild
              variant="ghost"
              className="absolute left-0 top-1/2 -translate-y-1/2"
            >
              <Link href={`/${currentLocale}/workspace?tab=resources`}>
                <ArrowLeft className="h-4 w-4" />
                {documentCopy.back}
              </Link>
            </Button>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center">
              <h1 className="text-lg font-semibold">{data.title}</h1>
              {data.category ? (
                <Badge variant="secondary" className="font-medium">
                  {data.category}
                </Badge>
              ) : null}
            </div>
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <a
                  href={data.doc_url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ExternalLink className="h-4 w-4" />
                  {documentCopy.openExternal}
                </a>
              </Button>
            </div>
          </div>
          <iframe
            src={data.doc_url}
            title={documentCopy.iframeTitle}
            className="h-full w-full flex-1 rounded-xl border border-border/70 bg-background"
          />
        </main>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("payment_receipts")
    .select("id, title, receipt_url")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle<ReceiptRecord>();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="h-screen">
      <WorkspaceSessionGuard locale={currentLocale} />
      <SiteHeader locale={currentLocale} nav={copy.nav} />
      <main className="mx-auto flex h-[calc(100dvh-65px)] w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative mb-4 min-h-16 py-1">
          <Button
            asChild
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <Link href={`/${currentLocale}/workspace?tab=payments`}>
              <ArrowLeft className="h-4 w-4" />
              {documentCopy.back}
            </Link>
          </Button>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center">
            <h1 className="text-lg font-semibold">{data.title}</h1>
          </div>
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a
                href={data.receipt_url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ExternalLink className="h-4 w-4" />
                {documentCopy.openExternal}
              </a>
            </Button>
          </div>
        </div>
        <iframe
          src={data.receipt_url}
          title={documentCopy.iframeTitle}
          className="h-full w-full flex-1 rounded-xl border border-border/70 bg-background"
        />
      </main>
    </div>
  );
}
