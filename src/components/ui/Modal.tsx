/**
 * ============================================================================
 * ফাইল: src/components/ui/Modal.tsx
 * কাজ (Purpose): পূর্ণাঙ্গ পপআপ মডাল বা ডায়লগ বক্স তৈরি করা।
 * কোথায় ব্যবহৃত হবে: ইমেজ জুম প্রিভিউ বা কনফার্মেশন মডালে।
 * ============================================================================
 */

'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}: ModalProps) {
  // ESC প্রেস করলে মডাল বন্ধ হয়ে যাওয়ার লজিক
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // মডাল ওপেন থাকলে ব্যাকগ্রাউন্ড স্ক্রোল বন্ধ রাখা
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      {/* মডাল বক্স */}
      <div
        className={cn(
          'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]',
          maxWidthClasses[maxWidth]
        )}
      >
        {/* মডাল হেডার */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* মডাল বডি */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}