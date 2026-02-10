"use client";

import { PowerGlitch } from "powerglitch";
import { useEffect, useRef } from "react";

type GlitchCodePreviewProps = {
  className?: string;
  html: string;
};

export function GlitchCodePreview({ className, html }: GlitchCodePreviewProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const glitch = PowerGlitch.glitch(ref.current, {
      timing: {
        duration: 3950,
      },
      glitchTimeSpan: {
        start: 0,
        end: 0.5,
      },
      shake: false,
      slice: {
        velocity: 31,
        minHeight: 0.01,
        maxHeight: 0.04,
      },
    });

    return () => {
      glitch.stopGlitch();
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden rounded-[inherit]">
      <div
        ref={ref}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
