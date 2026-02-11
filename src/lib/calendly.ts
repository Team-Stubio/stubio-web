export function withThemeCalendlyUrl(
  baseUrl: string,
  isDark: boolean,
  embedDomain?: string,
) {
  const themed = new URL(baseUrl);
  themed.searchParams.set("hide_event_type_details", "1");
  themed.searchParams.set("hide_gdpr_banner", "1");
  themed.searchParams.set("embed_type", "Inline");
  if (embedDomain) {
    themed.searchParams.set("embed_domain", embedDomain);
  }

  if (isDark) {
    themed.searchParams.set("background_color", "0b1612");
    themed.searchParams.set("text_color", "e5f5ed");
    themed.searchParams.set("primary_color", "36bf84");
  } else {
    themed.searchParams.set("background_color", "ffffff");
    themed.searchParams.set("text_color", "27312c");
    themed.searchParams.set("primary_color", "288f53");
  }

  return themed.toString();
}
