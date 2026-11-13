/**
 * ============================================================================
 * ফাইল: src/components/product/StickyMobileBar.tsx
 * কাজ (Purpose): মোবাইল স্ক্রিনে নিচে ফিক্সড (Sticky) প্রোডাক্ট প্রাইস ও অ্যামাজন বাটন দেখানো।
 * কেন গুরুত্বপূর্ণ: মোবাইল ইউজারদের কনভার্সন রেট দ্বিগুণ করতে এই স্টিকি বার সবচেয়ে কার্যকর।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

'use client';

import { Product } from '@/types/product.types';
import { getAffiliateUrl } from '@/lib/utils/affiliateLink';
import { ExternalLink } from 'lucide-react';

interface StickyMobileBarProps {
  product: Product;
}

export default function StickyMobileBar({ product }: StickyMobileBarProps) {
  const affiliateLink = getAffiliateUrl(product.affiliateUrl);

  const handleMobileClick = () => {
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
            {product.title}
          </p>
          <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
            {product.price}{' '}
            <span className="text-[10px] font-normal text-slate-400">
              (as of {product.priceUpdatedDate})
            </span>
          </p>
        </div>

        <a
          href={affiliateLink}
          target="_blank"
          rel="nofollow noopener noreferrer sponsored"
          onClick={handleMobileClick}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-emerald-600/20"
        >
          Check Amazon <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}