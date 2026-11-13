/**
 * ============================================================================
 * ফাইল: src/components/compare/FloatingCompareTray.tsx
 * কাজ (Purpose): তুলনা করার জন্য সিলেক্ট করা প্রোডাক্টগুলোর তালিকা নিচে ভাসমান অবস্থায় দেখানো।
 * কেন গুরুত্বপূর্ণ: ইউজার ব্রাউজ করার সময় কোন কোন প্রোডাক্ট সিলেক্ট করেছে তা মনে করিয়ে দেয়
 *               এবং এক ক্লিকে তুলনা পেজে নিয়ে যায়।
 * কোথায় ব্যবহৃত হবে: src/app/compare/page.tsx অথবা গ্লোবাল প্রোডাক্ট লিস্টে।
 * ============================================================================
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import { Scale, X, Trash2 } from 'lucide-react';

interface FloatingCompareTrayProps {
  selectedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

export default function FloatingCompareTray({
  selectedProducts,
  onRemoveProduct,
  onClearAll,
}: FloatingCompareTrayProps) {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* ১. সিলেক্ট করা প্রোডাক্টগুলোর ছোট প্রিভিউ থাম্বনেইল */}
        <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 shrink-0 mr-1">
            <Scale className="w-4 h-4" />
            <span>Compare ({selectedProducts.length}/3):</span>
          </div>

          {selectedProducts.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl pl-2 pr-1.5 py-1 shrink-0"
            >
              <div className="relative w-6 h-6 rounded-md overflow-hidden bg-slate-700 shrink-0">
                <Image
                  src={item.mainImage}
                  alt={item.title}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-medium max-w-[110px] truncate">
                {item.brand}
              </span>
              <button
                onClick={() => onRemoveProduct(item.id)}
                className="text-slate-400 hover:text-rose-400 p-0.5 rounded-lg transition cursor-pointer"
                aria-label={`Remove ${item.title}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* ২. ক্লিয়ার এবং কম্পেয়ার অ্যাকশন বাটন */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>

          <Link
            href="#comparison-table"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
          >
            <Scale className="w-3.5 h-3.5" /> View Side-by-Side
          </Link>
        </div>
      </div>
    </div>
  );
}