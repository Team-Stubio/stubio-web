"use client";

import { MoveHorizontal } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";

import { cn } from "@/lib/utils";

type DesignDiffProps = {
  beforeLabel: string;
  afterLabel: string;
};

function DesignMock({ variant }: { variant: "before" | "after" }) {
  const isAfter = variant === "after";

  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl p-4",
        isAfter
          ? "bg-gradient-to-br from-emerald-100 via-background to-emerald-50"
          : "bg-gradient-to-br from-rose-100 via-background to-amber-50"
      )}
    >
      <div
        className={cn(
          "h-full rounded-xl border p-4",
          isAfter
            ? "border-emerald-300/60 bg-white/90"
            : "border-rose-300/60 bg-white/70"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className={cn(
              "h-2.5 w-28 rounded-full",
              isAfter ? "bg-emerald-500" : "bg-rose-400"
            )}
          />
          <div className="flex gap-1.5">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isAfter ? "bg-emerald-400" : "bg-rose-300"
              )}
            />
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isAfter ? "bg-emerald-300" : "bg-amber-300"
              )}
            />
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isAfter ? "bg-emerald-200" : "bg-rose-200"
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div
            className={cn(
              "col-span-12 rounded-lg p-3",
              isAfter ? "bg-emerald-100/70" : "bg-rose-100/70"
            )}
          >
            <div
              className={cn(
                "mb-2 h-2.5 w-1/3 rounded-full",
                isAfter ? "bg-emerald-600/80" : "bg-rose-500/70"
              )}
            />
            <div
              className={cn(
                "h-2 w-4/5 rounded-full",
                isAfter ? "bg-emerald-500/50" : "bg-rose-400/50"
              )}
            />
          </div>

          <div
            className={cn(
              "rounded-lg p-3",
              isAfter ? "col-span-7 bg-emerald-50" : "col-span-7 bg-rose-50"
            )}
          >
            <div
              className={cn(
                "mb-2 h-2.5 w-2/3 rounded-full",
                isAfter ? "bg-emerald-500/70" : "bg-rose-500/60"
              )}
            />
            <div
              className={cn(
                "h-2 w-full rounded-full",
                isAfter ? "bg-emerald-400/40" : "bg-rose-400/40"
              )}
            />
            <div
              className={cn(
                "mt-2 h-2 w-5/6 rounded-full",
                isAfter ? "bg-emerald-400/40" : "bg-rose-400/40"
              )}
            />
          </div>

          <div
            className={cn(
              "rounded-lg p-3",
              isAfter
                ? "col-span-5 bg-emerald-100/60"
                : "col-span-5 bg-amber-100/60"
            )}
          >
            <div
              className={cn(
                "mb-2 h-2.5 w-3/4 rounded-full",
                isAfter ? "bg-emerald-600/70" : "bg-amber-500/70"
              )}
            />
            <div
              className={cn(
                "h-9 rounded-lg",
                isAfter ? "bg-emerald-500/50" : "bg-amber-400/40"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignDiff({ beforeLabel, afterLabel }: DesignDiffProps) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/70">
        <div className="aspect-16/8 w-full">
          <ReactCompareSlider
            className="h-full w-full"
            style={{ width: "100%", height: "100%" }}
            itemOne={
              <div className="h-full w-full">
                <DesignMock variant="before" />
              </div>
            }
            itemTwo={
              <div className="h-full w-full">
                <DesignMock variant="after" />
              </div>
            }
            position={58}
            handle={
              <ReactCompareSliderHandle
                buttonStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--primary) / 0.7)",
                  color: "hsl(var(--primary))",
                  padding: "0.5rem",
                  boxShadow: "0 8px 18px -10px rgba(0,0,0,0.45)",
                }}
                linesStyle={{
                  background: "hsl(var(--primary) / 0.9)",
                  width: "2px",
                }}
              >
                <MoveHorizontal className="h-3.5 w-3.5" />
              </ReactCompareSliderHandle>
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>
    </div>
  );
}
