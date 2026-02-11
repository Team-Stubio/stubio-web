"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ label }: { label: string }) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = hydrated && resolvedTheme === "dark";

  const Icon = useMemo(() => {
    if (!hydrated || !resolvedTheme) return MonitorCog;
    return isDark ? Moon : Sun;
  }, [hydrated, isDark, resolvedTheme]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 cursor-pointer rounded-lg border-border/80 bg-background/95 shadow-sm transition-transform hover:border-primary/50 hover:bg-card active:translate-y-0 focus-visible:ring-primary/50"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={hydrated ? `${label}: ${theme ?? "system"}` : label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
