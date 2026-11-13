/**
 * ============================================================================
 * ফাইল: src/app/privacy-policy/page.tsx
 * কাজ (Purpose): ভিজিটরের ডেটা, কুকি এবং থার্ড-পার্টি পিক্সেল ব্যবহারের নীতিমালা।
 * ============================================================================
 */

import type { Metadata } from 'next';
import siteConfigData from '@/data/siteConfig.json';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy and cookie usage disclosure for ${siteConfigData.siteName}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026</p>

        <p>
          At <strong>{siteConfigData.siteName}</strong> ({siteConfigData.siteUrl}), we respect your privacy and are committed to transparency regarding how information is collected and used.
        </p>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
          1. Analytics & Cookies
        </h2>
        <p>
          We may use standard analytics tools such as Google Analytics 4, Microsoft Clarity, and Meta Pixel to understand aggregate traffic patterns and outbound link clicks. These services may use cookies or anonymized identifiers to measure page engagement.
        </p>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
          2. Amazon Affiliate Cookies
        </h2>
        <p>
          When you click an outbound affiliate link to Amazon.com, Amazon places a tracking cookie on your browser to credit our Associate ID if you complete a qualifying purchase within their standard attribution window.
        </p>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
          3. AI Shopping Assistant Queries
        </h2>
        <p>
          Questions submitted to our floating AI Shopping Assistant are processed via the Google Gemini API solely to generate real-time product recommendations and are not sold or shared with third parties.
        </p>
      </div>
    </div>
  );
}