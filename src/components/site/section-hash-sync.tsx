"use client";

import { useEffect } from "react";

const DEFAULT_SECTION_IDS = [
  "hero",
  "social-proof",
  "services",
  "how-we-work",
  "design",
  "code",
  "comparison",
  "book-meeting",
  "projects",
  "stack",
  "faq",
] as const;

export function SectionHashSync() {
  useEffect(() => {
    const sections = DEFAULT_SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    let activeId = window.location.hash.slice(1);
    let frame = 0;

    const syncHash = () => {
      const triggerLine = window.innerHeight * 0.34;
      let nextId = sections[0].id;

      for (const section of sections) {
        const { top } = section.getBoundingClientRect();
        if (top <= triggerLine) {
          nextId = section.id;
        } else {
          break;
        }
      }

      if (!nextId || nextId === activeId) return;

      activeId = nextId;
      const url = new URL(window.location.href);
      if (nextId === "hero") {
        url.hash = "";
      } else {
        url.hash = nextId;
      }
      window.history.replaceState(null, "", url.toString());
    };

    const scheduleSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncHash();
      });
    };

    const observer = new IntersectionObserver(
      () => scheduleSync(),
      {
        root: null,
        rootMargin: "0px 0px -65% 0px",
        threshold: [0, 0.01],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    syncHash();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return null;
}
