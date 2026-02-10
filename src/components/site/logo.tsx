import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/locales";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3"
      aria-label="Stubio home"
    >
      <Image
        src="/logo.svg"
        alt="Stubio"
        width={36}
        height={36}
        className="rounded-lg"
      />
      <span className="font-extrabold text-md tracking-tight">Stubio</span>
    </Link>
  );
}
