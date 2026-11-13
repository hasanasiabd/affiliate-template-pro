/**
 * ============================================================================
 * ফাইল: src/components/chat/ChatMessageList.tsx
 * কাজ (Purpose): চ্যাটবক্সে ইউজার ও AI-এর মেসেজ দেখানো এবং নতুন মেসেজে অটো-স্ক্রোল করা।
 * কেন গুরুত্বপূর্ণ: AI মেসেজের ভেতরে থাকা প্রোডাক্ট লিংকগুলোকে (/products/slug) স্বয়ংক্রিয়ভাবে
 *               ক্লিকযোগ্য লিংকে রূপান্তর করে ইউজারকে রিভিউ পেজে নিয়ে যায়।
 * কোথায় ব্যবহৃত হবে: src/components/chat/ChatWidget.tsx
 * ============================================================================
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChatMessage } from '@/types/chat.types';
import { Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function ChatMessageList({
  messages,
  isLoading,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // নতুন মেসেজ আসলেই অটোমেটিক নিচে স্ক্রোল করার ইফেক্ট
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // মেসেজের ভেতর /products/slug পাথ থাকলে সেটিকে ক্লিকযোগ্য Next.js Link বানানো
  const renderFormattedContent = (text: string) => {
    const parts = text.split(/(\/products\/[a-zA-Z0-9-_]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('/products/')) {
        return (
          <Link
            key={i}
            href={part}
            className="inline-block font-bold text-emerald-500 underline hover:text-emerald-400 mx-1"
          >
            View Review →
          </Link>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-950">
      {messages.map((msg, idx) => {
        const isUser = msg.role === 'user';
        return (
          <div
            key={idx}
            className={cn(
              'flex items-start gap-2.5',
              isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* অ্যাভাটার আইকন */}
            <div
              className={cn(
                'w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                isUser
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-emerald-500 border border-slate-200 dark:border-slate-700'
              )}
            >
              {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* মেসেজ বাবল */}
            <div
              className={cn(
                'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap',
                isUser
                  ? 'bg-emerald-600 text-white rounded-tr-xs'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-tl-xs'
              )}
            >
              {renderFormattedContent(msg.content)}
            </div>
          </div>
        );
      })}

      {/* লোডিং এনিমেশন */}
      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-2">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
          <span>Analyzing gear catalog...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}