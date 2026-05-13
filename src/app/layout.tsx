import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from '@/components/vector/CookieBanner';
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = 'VECTOR | Data & Automation Consulting';
const siteDescription = 'Remote-first consulting for data automation, ETL pipelines, report performance, and governance. We turn data chaos into systems that actually work, worldwide.';
const siteUrl = 'https://vector.studiophoenix.ink';
const siteName = 'VECTOR';
const siteImage = '/images/branding/og-image.png';
const siteFavicon = '/images/branding/favicon.svg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // THE ANCHOR
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  icons: {
    icon: siteFavicon,
    shortcut: siteFavicon,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'ai-training': 'noai',
    'robots': 'noai, noimageai', // Specifically tells bots not to scrape images for training
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}