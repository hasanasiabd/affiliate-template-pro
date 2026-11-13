/**
 * ============================================================================
 * ফাইল: src/components/home/ProductCard.tsx
 * কাজ (Purpose): সিঙ্গেল প্রোডাক্টের আকর্ষণীয় প্রিভিউ কার্ড, রিভিউ লিংক এবং অ্যামাজন বাটন দেখানো।
 * কেন গুরুত্বপূর্ণ: এটি সরাসরি ভিজিটরকে রিভিউ পড়তে বা অ্যামাজনে গিয়ে প্রোডাক্ট কিনতে উৎসাহিত করে।
 * কোথায় ব্যবহৃত হবে: হোমপেজ গ্রিড, Editor's Choice সেকশন এবং ব্লগ পেজে।
 * ============================================================================
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import { getAffiliateUrl } from '@/lib/utils/affiliateLink';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const affiliateLink = getAffiliateUrl(product.affiliateUrl);

  // অ্যামাজন বাটনে ক্লিক করলে অ্যাডমিন ড্যাশবোর্ডের জন্য ক্লিক সংখ্যা রেকর্ড করা
  const handleAffiliateClick = () => {
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productSlug: product.slug,
        productTitle: product.title,
      }),
    }).catch(() => {});
  };

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-300 shadow-xs hover:shadow-xl">
      <div>
        {/* ১. প্রোডাক্টের ছবি ও উপরের ব্যাজ */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
          <Image
            src={product.mainImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badgeText && (
            <div className="absolute top-3 left-3">
              <Badge variant="emerald" className="bg-slate-900/90 text-emerald-400 border-emerald-500/30 backdrop-blur-xs">
                {product.badgeText}
              </Badge>
            </div>
          )}
        </div>

        {/* ২. ক্যাটাগরি ও স্টার রেটিং */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {product.brand} • {product.category}
          </span>
          <StarRating rating={product.rating} />
        </div>

        {/* ৩. প্রোডাক্ট টাইটেল ও ট্যাগলাইন */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {product.tagline}
        </p>

        {/* ৪. প্রধান ১টি হাইলাইট পজিটিভ দিক (Top Pro) */}
        {product.pros[0] && (
          <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4 border border-slate-200/60 dark:border-slate-700/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{product.pros[0]}</span>
          </div>
        )}
      </div>

      {/* ৫. নিচের দাম (তারিখসহ) এবং অ্যাকশন বাটন */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {product.price}
            </span>
            <span className="block text-[10px] text-slate-400">
              As of {product.priceUpdatedDate}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Full Review <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <a
          href={affiliateLink}
          target="_blank"
          rel="nofollow noopener noreferrer sponsored"
          onClick={handleAffiliateClick}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/15 transition active:scale-98"
        >
          Check Price on Amazon <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}