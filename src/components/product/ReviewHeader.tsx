/**
 * ============================================================================
 * ফাইল: src/components/product/ReviewHeader.tsx
 * কাজ (Purpose): সিঙ্গেল প্রোডাক্ট রিভিউ পেজের উপরের শিরোনাম, রেটিং, লেখক ও তারিখ দেখানো।
 * কেন গুরুত্বপূর্ণ: গুগলের E-E-A-T অ্যালগরিদমের জন্য রিভিউ লেখকের নাম ও আপডেটের তারিখ
 *               স্পষ্টভাবে থাকা অত্যন্ত জরুরি।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import Link from 'next/link';
import { Product } from '@/types/product.types';
import siteConfigData from '@/data/siteConfig.json';
import { formatDate } from '@/lib/utils/formatters';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { Calendar, UserCheck, ChevronRight } from 'lucide-react';

interface ReviewHeaderProps {
  product: Product;
}

export default function ReviewHeader({ product }: ReviewHeaderProps) {
  return (
    <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
      {/* ১. ব্রেডক্রাম্ব নেভিগেশন */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-500 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/#all-reviews" className="hover:text-emerald-500 transition capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
          {product.title}
        </span>
      </nav>

      {/* ২. ব্যাজ এবং স্টার রেটিং */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {product.badgeText && (
          <Badge variant="emerald">{product.badgeText}</Badge>
        )}
        <Badge variant="slate" className="uppercase">{product.brand}</Badge>
        <StarRating rating={product.rating} size="md" />
      </div>

      {/* ৩. মূল শিরোনাম (H1) ও ট্যাগলাইন */}
      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-3">
        {product.title} Review
      </h1>
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-5">
        {product.tagline}
      </p>

      {/* ৪. লেখক ও প্রকাশের তারিখ (E-E-A-T সিগন্যাল) */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-emerald-500" />
          <span>
            Tested & Reviewed by <strong className="text-slate-800 dark:text-slate-200">{siteConfigData.author.name}</strong>
          </span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-emerald-500" />
          <span>Updated {formatDate(product.publishedAt)}</span>
        </div>
      </div>
    </header>
  );
}