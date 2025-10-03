import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import App from "../components/app";
import MessageDisplay from "../components/message-display";
import WhereIsMessageService from "../service/where-is-message.service";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next"

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

const SITE_URL = process.env.SITE_URL;

export async function generateMetadata(props: LayoutProps<'/[locale]'>, parent: ResolvingMetadata): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({locale, namespace: "Metadata"});
  const message = await WhereIsMessageService.getRandomMessage(locale);
  return {
    title: t("Title"),
    description: t("Description"),
    openGraph: {
      title: t("Title"),
      description: message.text,
      images: [
        {
          url: `${SITE_URL}/images/${message.image}`,
          width: 800,
          height: 600,
          alt: message.text,
        }
      ]
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
  let message = await WhereIsMessageService.getRandomMessage(locale);
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
