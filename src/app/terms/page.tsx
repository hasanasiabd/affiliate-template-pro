/**
 * ============================================================================
 * ফাইল: src/app/terms/page.tsx
 * কাজ (Purpose): ওয়েবসাইট ব্যবহারের শর্তাবলি এবং প্রোডাক্টের দাম পরিবর্তন সংক্রান্ত ডিসক্লেইমার।
 * ============================================================================
 */

import type { Metadata } from 'next';
import siteConfigData from '@/data/siteConfig.json';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service and pricing accuracy disclaimer for ${siteConfigData.siteName}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026</p>

        <p>
          By accessing and using <strong>{siteConfigData.siteName}</strong>, you agree to the following terms and conditions.
        </p>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
          1. Pricing & Availability Accuracy
        </h2>
        <p>
          Product prices and availability displayed on this site are baseline figures accurate as of the date indicated on each review card and are subject to change on Amazon without notice. Always verify the final live price and stock status on Amazon prior to checkout.
        </p>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
          2. Informational Purpose
        </h2>
        <p>
          All reviews, ergonomic guides, and AI assistant responses are provided for informational purposes. {siteConfigData.siteName} is not the manufacturer or direct seller of any physical products listed.
        </p>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
          3. Intellectual Property
        </h2>
        <p>
          Original review copy, custom benchmark tables, and site architecture may not be reproduced without written permission. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
        </p>
      </div>
    </div>
  );
}