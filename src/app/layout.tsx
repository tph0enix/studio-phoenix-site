import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vector.studiophoenix.ink'), // THE ANCHOR
  title: {
    default: 'VECTOR | Reality-Born Systems Architecture',
    template: '%s | VECTOR'
  },
  description: 'High-performance data infrastructure, automation, and technical governance by Tristan Phoenix. Restoring authentic beauty & information in the Age of the Digital Facade.',
  openGraph: {
    title: 'VECTOR | Systems Architecture',
    description: 'Data infrastructure that ignites performance. Built by Studio Phoenix.',
    url: 'https://vector.studiophoenix.ink',
    siteName: 'VECTOR',
    images: [
      {
        url: '/images/branding/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VECTOR Systems Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VECTOR | Systems Architecture',
    description: 'Restoring authenticity to data systems.',
    images: ['/images/branding/og-image.png'],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}