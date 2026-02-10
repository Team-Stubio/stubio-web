import { copyByLocale } from "@/i18n/copy";
import { defaultLocale, isLocale, type Locale } from "@/i18n/locales";

export function getCopy(locale: string) {
  if (!isLocale(locale)) {
    return copyByLocale[defaultLocale];
  }

  return copyByLocale[locale as Locale];
}
