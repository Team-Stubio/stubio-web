import Link from "next/link";

import type { Locale } from "@/i18n/locales";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3"
      aria-label="Stubio home"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        aria-hidden
      >
        <path
          d="M137.5 100C158.211 100 175 116.789 175 137.5C175 158.211 158.211 175 137.5 175H25L114.921 107.561C121.202 102.816 129.022 100 137.5 100ZM85.0791 92.4395C78.7978 97.184 70.9784 100 62.5 100C41.7893 100 25 83.2107 25 62.5C25 41.7893 41.7893 25 62.5 25H175L85.0791 92.4395Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-extrabold text-md tracking-tight">Stubio</span>
    </Link>
  );
}
