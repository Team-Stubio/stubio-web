import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { WorkspaceSessionGuard } from "@/components/auth/workspace-session-guard";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { copyByLocale } from "@/i18n/copy";
import { isLocale, type Locale } from "@/i18n/locales";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type WorkspaceTab = "overview" | "resources" | "payments";

type ClientProfile = {
  full_name: string | null;
  company_name: string | null;
  timezone: string | null;
};

type ClientOverview = {
  project_status: string | null;
  next_milestone: string | null;
  next_milestone_date: string | null;
  last_update: string | null;
  updated_at: string | null;
};

type WorkspaceResource = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  doc_url: string;
  created_at: string | null;
};

type PaymentReceipt = {
  id: string;
  title: string;
  description: string | null;
  receipt_url: string;
  issued_at: string | null;
  amount: number | null;
  currency: string | null;
};

type UpcomingPayment = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  due_date: string;
  status: string;
};

type WorkspaceCopy = {
  title: string;
  subtitle: string;
  tabs: Record<WorkspaceTab, string>;
  greeting: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  overview: {
    title: string;
    company: string;
    status: string;
    milestone: string;
    due: string;
    lastUpdate: string;
    empty: string;
    logout: string;
  };
  resources: {
    title: string;
    empty: string;
    open: string;
  };
  payments: {
    title: string;
    futureTitle: string;
    pastTitle: string;
    empty: string;
    itemLabel: string;
    dateLabel: string;
    amountLabel: string;
    actionLabel: string;
    openReceipt: string;
    dueLabel: string;
    issuedLabel: string;
    statuses: {
      scheduled: string;
      pending: string;
      paid: string;
      overdue: string;
      unknown: string;
    };
  };
  setupWarning: string;
};

const workspaceCopyByLocale: Record<Locale, WorkspaceCopy> = {
  en: {
    title: "Client workspace",
    subtitle: "Your project updates, resources, and payments in one place.",
    tabs: {
      overview: "Overview",
      resources: "Resources",
      payments: "Payments",
    },
    greeting: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    },
    overview: {
      title: "Overview",
      company: "Company",
      status: "Project status",
      milestone: "Next milestone",
      due: "Milestone due date",
      lastUpdate: "Last update",
      empty: "No overview data has been added yet.",
      logout: "Logout",
    },
    resources: {
      title: "Resources",
      empty: "No resources available yet.",
      open: "Open document",
    },
    payments: {
      title: "Payments",
      futureTitle: "Future payments",
      pastTitle: "Past payments",
      empty: "No payments available yet.",
      itemLabel: "Item",
      dateLabel: "Date",
      amountLabel: "Amount",
      actionLabel: "Action",
      openReceipt: "Open receipt",
      dueLabel: "Due",
      issuedLabel: "Issued",
      statuses: {
        scheduled: "Scheduled",
        pending: "Pending",
        paid: "Paid",
        overdue: "Overdue",
        unknown: "Unknown",
      },
    },
    setupWarning:
      "Some workspace tables are not available yet. Follow the Supabase setup steps to complete the workspace data model.",
  },
  da: {
    title: "Kundeområde",
    subtitle: "Dine projektopdateringer, ressourcer og betalinger samlet ét sted.",
    tabs: {
      overview: "Overblik",
      resources: "Ressourcer",
      payments: "Betalinger",
    },
    greeting: {
      morning: "Godmorgen",
      afternoon: "God eftermiddag",
      evening: "God aften",
    },
    overview: {
      title: "Overblik",
      company: "Virksomhed",
      status: "Projektstatus",
      milestone: "Næste milepæl",
      due: "Forfaldsdato",
      lastUpdate: "Seneste opdatering",
      empty: "Der er endnu ikke tilføjet data til overblikket.",
      logout: "Log ud",
    },
    resources: {
      title: "Ressourcer",
      empty: "Ingen ressourcer endnu.",
      open: "Åbn dokument",
    },
    payments: {
      title: "Betalinger",
      futureTitle: "Kommende betalinger",
      pastTitle: "Tidligere betalinger",
      empty: "Ingen betalinger endnu.",
      itemLabel: "Post",
      dateLabel: "Dato",
      amountLabel: "Beløb",
      actionLabel: "Handling",
      openReceipt: "Åbn kvittering",
      dueLabel: "Forfalder",
      issuedLabel: "Udstedt",
      statuses: {
        scheduled: "Planlagt",
        pending: "Afventer",
        paid: "Betalt",
        overdue: "Forfalden",
        unknown: "Ukendt",
      },
    },
    setupWarning:
      "Nogle workspace-tabeller mangler stadig. Følg Supabase-opsætningen for at færdiggøre datamodellen.",
  },
};

function normalizeTab(value: string | undefined): WorkspaceTab {
  if (value === "resources" || value === "payments") {
    return value;
  }

  return "overview";
}

function formatDate(value: string | null, locale: Locale) {
  if (!value) return "—";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-US", {
    dateStyle: "medium",
  }).format(date);
}

function formatAmount(amount: number | null, currency: string | null, locale: Locale) {
  if (amount === null || !currency) {
    return "—";
  }

  try {
    return new Intl.NumberFormat(locale === "da" ? "da-DK" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

function getGreetingByHour(locale: Locale, hour: number) {
  const copy = workspaceCopyByLocale[locale];

  if (hour < 12) {
    return copy.greeting.morning;
  }

  if (hour < 18) {
    return copy.greeting.afternoon;
  }

  return copy.greeting.evening;
}

function isMissingTableError(code: string | undefined) {
  return code === "42P01" || code === "PGRST205";
}

function formatStatusLabel(status: string, locale: Locale) {
  const labels = workspaceCopyByLocale[locale].payments.statuses;

  switch (status) {
    case "scheduled":
      return labels.scheduled;
    case "pending":
      return labels.pending;
    case "paid":
      return labels.paid;
    case "overdue":
      return labels.overdue;
    default:
      return labels.unknown;
  }
}

export default async function WorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const copy = copyByLocale[currentLocale];
  const workspaceCopy = workspaceCopyByLocale[currentLocale];
  const { tab } = await searchParams;
  const activeTab = normalizeTab(tab);
  const user = await requireAuthenticatedUser(currentLocale);

  const supabase = await createSupabaseServerClient();
  const setupErrors: string[] = [];

  const { data: profileData, error: profileError } = await supabase
    .from("client_profiles")
    .select("full_name, company_name, timezone")
    .eq("user_id", user.id)
    .maybeSingle<ClientProfile>();

  if (profileError && !isMissingTableError(profileError.code)) {
    throw profileError;
  }

  if (profileError && isMissingTableError(profileError.code)) {
    setupErrors.push(profileError.message);
  }

  const { data: overviewData, error: overviewError } = await supabase
    .from("client_overview")
    .select("project_status, next_milestone, next_milestone_date, last_update, updated_at")
    .eq("user_id", user.id)
    .maybeSingle<ClientOverview>();

  if (overviewError && !isMissingTableError(overviewError.code)) {
    throw overviewError;
  }

  if (overviewError && isMissingTableError(overviewError.code)) {
    setupErrors.push(overviewError.message);
  }

  const { data: resourcesData, error: resourcesError } = await supabase
    .from("workspace_resources")
    .select("id, title, description, category, doc_url, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<WorkspaceResource[]>();

  if (resourcesError && !isMissingTableError(resourcesError.code)) {
    throw resourcesError;
  }

  if (resourcesError && isMissingTableError(resourcesError.code)) {
    setupErrors.push(resourcesError.message);
  }

  const { data: receiptsData, error: receiptsError } = await supabase
    .from("payment_receipts")
    .select("id, title, description, receipt_url, issued_at, amount, currency")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false })
    .limit(6)
    .returns<PaymentReceipt[]>();

  if (receiptsError && !isMissingTableError(receiptsError.code)) {
    throw receiptsError;
  }

  if (receiptsError && isMissingTableError(receiptsError.code)) {
    setupErrors.push(receiptsError.message);
  }

  const { data: upcomingData, error: upcomingError } = await supabase
    .from("upcoming_payments")
    .select("id, description, amount, currency, due_date, status")
    .eq("user_id", user.id)
    .order("due_date", { ascending: true })
    .returns<UpcomingPayment[]>();

  if (upcomingError && !isMissingTableError(upcomingError.code)) {
    throw upcomingError;
  }

  if (upcomingError && isMissingTableError(upcomingError.code)) {
    setupErrors.push(upcomingError.message);
  }

  const profile = profileData ?? null;
  const overview = overviewData ?? null;
  const resources = resourcesData ?? [];
  const receipts = receiptsData ?? [];
  const upcomingPayments = upcomingData ?? [];
  const clientName =
    profile?.full_name?.trim() ||
    profile?.company_name?.trim() ||
    user.email ||
    "Client";
  const timezone = profile?.timezone?.trim() || "Europe/Copenhagen";
  const localizedHour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(new Date()),
  );
  const safeHour = Number.isNaN(localizedHour) ? 12 : localizedHour;
  const greeting = getGreetingByHour(currentLocale, safeHour);
  const tabs: WorkspaceTab[] = ["overview", "resources", "payments"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futurePayments = upcomingPayments
    .filter((item) => {
      const dueDate = new Date(item.due_date);
      return !Number.isNaN(dueDate.getTime()) && dueDate >= today;
    })
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  const pastPaymentsFromUpcoming = upcomingPayments
    .filter((item) => {
      const dueDate = new Date(item.due_date);
      return Number.isNaN(dueDate.getTime()) || dueDate < today;
    })
    .map((item) => ({
      kind: "upcoming" as const,
      id: item.id,
      title: item.description,
      amount: item.amount,
      currency: item.currency,
      date: item.due_date,
      status: item.status,
      href: null as string | null,
    }));
  const pastPaymentsFromReceipts = receipts.map((receipt) => ({
    kind: "receipt" as const,
    id: receipt.id,
    title: receipt.title,
    amount: receipt.amount,
    currency: receipt.currency,
    date: receipt.issued_at,
    status: "paid",
    href: `/${currentLocale}/workspace/document/receipt/${receipt.id}`,
  }));
  const pastPayments = [...pastPaymentsFromUpcoming, ...pastPaymentsFromReceipts].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );
  const unifiedPayments = [
    ...futurePayments.map((item) => ({
      key: `future-${item.id}`,
      title: item.description,
      dateLabel: workspaceCopy.payments.dueLabel,
      date: item.due_date,
      amount: item.amount,
      currency: item.currency,
      status: item.status,
      href: null as string | null,
    })),
    ...pastPayments.map((item) => ({
      key: `${item.kind}-${item.id}`,
      title: item.title,
      dateLabel:
        item.kind === "receipt"
          ? workspaceCopy.payments.issuedLabel
          : workspaceCopy.payments.dueLabel,
      date: item.date,
      amount: item.amount,
      currency: item.currency,
      status: item.status,
      href: item.href,
    })),
  ];

  return (
    <div className="relative">
      <WorkspaceSessionGuard locale={currentLocale} />
      <SiteHeader locale={currentLocale} nav={copy.nav} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3">
          <Badge className="w-fit">Stubio Workspace</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            {greeting}, {clientName}
          </h1>
          <p className="text-muted-foreground">{workspaceCopy.subtitle}</p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-border/70 bg-background/70 p-1">
          {tabs.map((item) => (
            <Button
              key={item}
              asChild
              variant={activeTab === item ? "secondary" : "ghost"}
              size="sm"
              className="rounded-lg"
            >
              <Link href={`/${currentLocale}/workspace?tab=${item}`}>
                {workspaceCopy.tabs[item]}
              </Link>
            </Button>
          ))}
        </div>

        {setupErrors.length > 0 ? (
          <Card className="mb-6 border-yellow-500/40 bg-yellow-500/5">
            <CardContent className="pt-6 text-sm text-yellow-900 dark:text-yellow-100">
              {workspaceCopy.setupWarning}
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "overview" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{workspaceCopy.overview.title}</CardTitle>
                <CardDescription>{workspaceCopy.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {overview ? (
                  <>
                    <div>
                      <p className="text-muted-foreground">{workspaceCopy.overview.company}</p>
                      <p className="font-medium">{profile?.company_name ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{workspaceCopy.overview.status}</p>
                      <p className="font-medium">{overview.project_status ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{workspaceCopy.overview.milestone}</p>
                      <p className="font-medium">{overview.next_milestone ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{workspaceCopy.overview.due}</p>
                      <p className="font-medium">
                        {formatDate(overview.next_milestone_date, currentLocale)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{workspaceCopy.overview.lastUpdate}</p>
                      <p className="font-medium">{overview.last_update ?? "—"}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">{workspaceCopy.overview.empty}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{workspaceCopy.overview.logout}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <form action="/auth/logout" method="post">
                  <input type="hidden" name="locale" value={currentLocale} />
                  <Button type="submit">{workspaceCopy.overview.logout}</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeTab === "resources" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.length === 0 ? (
              <Card className="sm:col-span-2 lg:col-span-3">
                <CardContent className="pt-6 text-muted-foreground">
                  {workspaceCopy.resources.empty}
                </CardContent>
              </Card>
            ) : null}

            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <Badge variant="secondary" className="font-medium">
                    {resource.category ?? workspaceCopy.resources.title}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p
                    className="text-sm text-muted-foreground"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {resource.description ?? "—"}
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/${currentLocale}/workspace/document/resource/${resource.id}`}>
                      {workspaceCopy.resources.open}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {activeTab === "payments" ? (
          <Card>
            <CardHeader>
              <CardTitle>{workspaceCopy.payments.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {unifiedPayments.length === 0 ? (
                <p className="text-sm text-muted-foreground">{workspaceCopy.payments.empty}</p>
              ) : (
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <div className="hidden grid-cols-12 gap-4 bg-muted/40 px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground md:grid">
                    <p className="col-span-5">{workspaceCopy.payments.itemLabel}</p>
                    <p className="col-span-3">{workspaceCopy.payments.dateLabel}</p>
                    <p className="col-span-2 text-right">{workspaceCopy.payments.amountLabel}</p>
                    <p className="col-span-2 text-right">{workspaceCopy.payments.actionLabel}</p>
                  </div>
                  {unifiedPayments.map((item) => (
                    <div
                      key={item.key}
                      className="grid gap-3 border-t border-border/60 px-4 py-4 text-sm font-medium first:border-t-0 md:grid-cols-12 md:items-center md:gap-4"
                    >
                      <p className="font-semibold md:col-span-5 md:truncate">{item.title}</p>
                      <p className="text-muted-foreground md:col-span-3">
                        {formatDate(item.date, currentLocale)}
                      </p>
                      <p className="text-muted-foreground md:col-span-2 md:text-right">
                        {formatAmount(item.amount, item.currency, currentLocale)}
                      </p>
                      <div className="flex md:col-span-2 md:justify-end">
                        {item.href ? (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs font-medium text-primary hover:text-primary"
                          >
                            <Link href={item.href}>
                              {workspaceCopy.payments.openReceipt}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        ) : (
                          <Badge variant="secondary">{formatStatusLabel(item.status, currentLocale)}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
      </main>
    </div>
  );
}
