/**
 * ============================================================================
 * ফাইল: src/components/home/NewsletterBox.tsx
 * কাজ (Purpose): প্রাইস ড্রপ ও নতুন রিভিউ আপডেটের জন্য ভিজিটরের ইমেইল সাবস্ক্রিপশন বক্স।
 * কেন গুরুত্বপূর্ণ: সার্চ ইঞ্জিন থেকে আসা ভিজিটরদের স্থায়ী অডিয়েন্সে রূপান্তর করতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: src/app/page.tsx (হোমপেজ)
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="my-16">
      <div className="bg-slate-900 dark:bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-xl">
        <div className="max-w-xl mx-auto relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Never Overpay for Developer Gear
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-6">
            Get notified when our top-rated mechanical keyboards, mice, and coding monitors hit all-time low prices on Amazon. No spam, ever.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Thanks for subscribing! You are on the deal alert list.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition cursor-pointer shrink-0"
              >
                Join Free
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}