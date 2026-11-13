/**
 * ============================================================================
 * ফাইল: src/components/layout/Footer.tsx
 * কাজ (Purpose): সাইটের ফুটার, লিগ্যাল পেজ লিংক এবং অ্যামাজন কপিরাইট ডিসক্লোজার দেখানো।
 * কেন গুরুত্বপূর্ণ: গুগল এবং অ্যামাজন রিভিউয়াররা ফুটারেই সর্বপ্রথম লিগ্যাল লিংকগুলো খোঁজে।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx
 * ============================================================================
 */

import Link from 'next/link';
import siteConfigData from '@/data/siteConfig.json';
import { Cpu } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* কলাম ১: সাইট পরিচিতি */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                {siteConfigData.siteName}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md mb-4">
              {siteConfigData.siteDescription}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Reviewed & curated by <strong className="text-slate-700 dark:text-slate-300">{siteConfigData.author.name}</strong> ({siteConfigData.author.role}).
            </p>
          </div>

          {/* কলাম ২: কুইক নেভিগেশন */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#top-picks" className="hover:text-emerald-500 transition">Editor&apos;s Choice</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-500 transition">Buying Guides</Link></li>
              <li><Link href="/compare" className="hover:text-emerald-500 transition">Compare Products</Link></li>
              <li><Link href="/about" className="hover:text-emerald-500 transition">Testing Methodology</Link></li>
            </ul>
          </div>

          {/* কলাম ৩: বাধ্যতামূলক লিগ্যাল পেজসমূহ */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Legal & Compliance
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/affiliate-disclosure" className="hover:text-emerald-500 transition">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-emerald-500 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-500 transition">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-500 transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* নিচের অ্যামাজন কমপ্লায়েন্স বক্স ও কপিরাইট */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} {siteConfigData.siteName}. All rights reserved.
          </p>
          <p className="text-center sm:text-right max-w-xl text-slate-500">
            {siteConfigData.disclosureText} Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </div>
      </div>
    </footer>
  );
}