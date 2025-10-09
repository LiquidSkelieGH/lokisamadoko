import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import React from "react";
import App from "@/components/app";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next"
import { getWhereIsMessageService } from "@/lib/server/di/hooks";
import { getEnvironmentService } from "@/lib/common/di/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

const SITE_URL = getEnvironmentService().siteUrl;

export async function generateMetadata(props: LayoutProps<'/[locale]'>, parent: ResolvingMetadata): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({locale, namespace: "Metadata"});
  return {
    title: t("Title"),
    description: t("Description"),
    openGraph: {
      title: t("Title")
    }
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  let message = await getWhereIsMessageService().getRandomMessage(locale);
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <App message={message}>
            {children}
          </App>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
