import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import { ThemeProvider } from "@/components/site/theme-provider";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Stubio",
    template: "%s | Stubio",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Stubio",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Stubio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stubio",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${manrope.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
