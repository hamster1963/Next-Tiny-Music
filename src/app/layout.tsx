import "./globals.css";

import type {Metadata, Viewport} from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Layout} from "@/components/Layout";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL('https://next-tiny-music.buycoffee.top/'),
  title: {
    template: '%s - Tiny Music',
    default:
      'Tiny Music',
  },
  description:
    'Tiny Music',
};


export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",

  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
          suppressHydrationWarning>
    <head>
      <link rel="manifest" href="/manifest.json"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <meta content="yes" name="apple-mobile-web-app-capable"/>
      <title></title>
    </head>
    <body className={inter.className}>
    <Providers>
      <Script
          src="https://umami.buycoffee.top/script.js"
          data-website-id="3cc27476-8d0e-4374-9db4-0d5e126fe55e"
      />
      <SpeedInsights/>
      <Analytics/>
      <Layout>{children}</Layout>
    </Providers>
    </body>
    </html>
  );
}
