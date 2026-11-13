/**
 * ============================================================================
 * ফাইল: src/app/layout.tsx
 * কাজ (Purpose): পুরো ওয়েবসাইটের রুট লেআউট, গ্লোবাল মেটাডেটা, পিক্সেল ও চ্যাটবট লোডার।
 * কেন গুরুত্বপূর্ণ: প্রতিটি পেজে স্বয়ংক্রিয়ভাবে ডিসক্লোজার বার, নেভবার, ফুটার ও AI এজেন্ট যুক্ত রাখে।
 * ============================================================================
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import siteConfigData from '@/data/siteConfig.json';
import trackingConfigData from '@/data/trackingConfig.json';

import ThemeProvider from '@/components/layout/ThemeProvider';
import TopDisclosureBar from '@/components/layout/TopDisclosureBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

import MetaPixelScript from '@/components/tracking/MetaPixelScript';
import GoogleAnalyticsScript from '@/components/tracking/GoogleAnalyticsScript';
import ClarityScript from '@/components/tracking/ClarityScript';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// গ্লোবাল এসইও এবং ওপেন-গ্রাফ (OpenGraph) মেটাডেটা
export const metadata: Metadata = {
  metadataBase: new URL(siteConfigData.siteUrl),
  title: {
    default: `${siteConfigData.siteName} — ${siteConfigData.siteTagline}`,
    template: `%s | ${siteConfigData.siteName}`,
  },
  description: siteConfigData.siteDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfigData.siteUrl,
    siteName: siteConfigData.siteName,
    title: siteConfigData.siteName,
    description: siteConfigData.siteDescription,
  },
  verification: {
    google: trackingConfigData.googleSiteVerification || undefined,
    other: trackingConfigData.bingSiteVerification
      ? { 'msvalidate.01': trackingConfigData.bingSiteVerification }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfigData.defaultTheme || 'dark'}
          enableSystem={false}
        >
          {/* ১. অ্যামাজন কমপ্লায়েন্স টপ ডিসক্লোজার বার */}
          <TopDisclosureBar />

          {/* ২. স্টিকি নেভিগেশন বার */}
          <Navbar />

          {/* ৩. প্রতিটি পেজের মূল কন্টেন্ট */}
          <main className="flex-1">{children}</main>

          {/* ৪. গ্লোবাল ফুটার */}
          <Footer />

          {/* ৫. ফ্লোটিং Gemini AI শপিং অ্যাসিস্ট্যান্ট */}
          <ChatWidget />

          {/* ৬. মার্কেটিং ও অ্যানালিটিক্স ট্র্যাকিং স্ক্রিপ্টসমূহ */}
          <MetaPixelScript />
          <GoogleAnalyticsScript />
          <ClarityScript />
        </ThemeProvider>
      </body>
    </html>
  );
}