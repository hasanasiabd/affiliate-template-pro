/**
 * ============================================================================
 * ফাইল: src/components/product/AffiliateCtaButton.tsx
 * কাজ (Purpose): রিভিউ পেজের ভেতর হাই-কনভার্টিং "Check Price on Amazon" কল-টু-অ্যাকশন বক্স।
 * কেন গুরুত্বপূর্ণ: বাটনে ক্লিক করার সাথে সাথে লোকাল JSON এবং Meta Pixel-এ ক্লিক রেকর্ড করে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

'use client';

import { Product } from '@/types/product.types';
import { getAffiliateUrl } from '@/lib/utils/affiliateLink';
import { ExternalLink, ShieldCheck, ShoppingBag } from 'lucide-react';

interface AffiliateCtaButtonProps {
  product: Product;
}

export default function AffiliateCtaButton({ product }: AffiliateCtaButtonProps) {
  const affiliateLink = getAffiliateUrl(product.affiliateUrl);

  const handleTrackClick = () => {
    // ১. অ্যাডমিন ড্যাশবোর্ডের clickStats.json-এ ক্লিক কাউন্ট পাঠানো
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productSlug: product.slug,
        productTitle: product.title,
      }),
    }).catch(() => {});

    // ২. Meta Pixel (fbq) সেটআপ করা থাকলে ইভেন্ট পাঠানো
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('trackCustom', 'AmazonOutboundClick', {
        product_name: product.title,
        product_slug: product.slug,
        price: product.price,
      });
    }
  };

  return (
    <div className="my-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" /> Verified Amazon Listing
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">
          Ready to upgrade with the {product.brand}?
        </h3>
        <p className="text-xs text-slate-400">
           listed at <strong className="text-white">{product.price}</strong> (as of {product.priceUpdatedDate}). Prices and deals may vary on Amazon.
        </p>
      </div>

      <a
        href={affiliateLink}
        target="_blank"
        rel="nofollow noopener noreferrer sponsored"
        onClick={handleTrackClick}
        className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 transition transform active:scale-95 shrink-0"
      >
        <ShoppingBag className="w-5 h-5" />
        Check Live Price on Amazon
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}