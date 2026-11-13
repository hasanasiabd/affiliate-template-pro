/**
 * ============================================================================
 * ফাইল: src/components/product/ProductMediaGallery.tsx
 * কাজ (Purpose): প্রোডাক্টের অপ্টিমাইজড WebP ছবি এবং WebM ডেমো ভিডিও গ্যালারি আকারে দেখানো।
 * কেন গুরুত্বপূর্ণ: ভিডিওতে preload="none" থাকায় পেজ লোড স্লো হয় না, ইউজার ক্লিক করলেই কেবল লোড হয়।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ProductMediaGalleryProps {
  title: string;
  mainImage: string;
  galleryImages?: string[];
  demoVideoUrl?: string;
}

export default function ProductMediaGallery({
  title,
  mainImage,
  galleryImages = [],
  demoVideoUrl,
}: ProductMediaGalleryProps) {
  const allImages = [mainImage, ...galleryImages];
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="my-6">
      {/* ১. প্রধান ডিসপ্লে এরিয়া (ছবি অথবা ভিডিও) */}
      <div className="relative w-full h-72 sm:h-96 md:h-[440px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-3">
        {activeMedia === 'image' ? (
          <Image
            src={allImages[selectedImageIndex]}
            alt={`${title} - view ${selectedImageIndex + 1}`}
            fill
            priority={selectedImageIndex === 0}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        ) : (
          <video
            src={demoVideoUrl}
            controls
            preload="none"
            poster={mainImage}
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* ২. নিচের থাম্বনেইল সিলেক্টর বার (একাধিক ছবি বা ভিডিও থাকলে দেখাবে) */}
      {(allImages.length > 1 || demoVideoUrl) && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {allImages.map((imgUrl, idx) => {
            const isSelected = activeMedia === 'image' && selectedImageIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveMedia('image');
                  setSelectedImageIndex(idx);
                }}
                className={cn(
                  'relative w-20 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer',
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                )}
              >
                <Image
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}

          {/* ডেমো ভিডিও থাম্বনেইল বাটন */}
          {demoVideoUrl && (
            <button
              onClick={() => setActiveMedia('video')}
              className={cn(
                'flex items-center justify-center gap-1.5 px-4 h-16 rounded-xl border-2 text-xs font-bold transition shrink-0 cursor-pointer bg-slate-900 text-white',
                activeMedia === 'video'
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-400'
                  : 'border-slate-800 opacity-80 hover:opacity-100'
              )}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Demo</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}