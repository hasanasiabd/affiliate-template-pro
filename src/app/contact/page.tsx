/**
 * ============================================================================
 * ফাইল: src/app/contact/page.tsx
 * কাজ (Purpose): ভিজিটরদের প্রশ্ন, রিভিউ রিকোয়েস্ট বা ফর্ম মেসেজ পাঠানোর পেজ।
 * কেন গুরুত্বপূর্ণ: গুগল এবং অ্যামাজন রিভিউয়ারদের কাছে সাইটের বিশ্বাসযোগ্যতা প্রমাণ করে।
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import siteConfigData from '@/data/siteConfig.json';
import Button from '@/components/ui/Button';
import { Mail, MessageSquare, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
          Contact {siteConfigData.siteName}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Have a question about a specific developer setup, want to suggest a product for review, or spotted an outdated specification? Reach out below.
        </p>
      </div>

      {/* ডিরেক্ট ইমেইল ইনফো কার্ড */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 mb-8 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Direct Editorial Inquiry
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Reviewed & managed by <strong>{siteConfigData.author.name}</strong> ({siteConfigData.author.role})
          </p>
        </div>
      </div>

      {/* কন্টাক্ট ফরম */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Message Received!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Thank you for reaching out to {siteConfigData.siteName}. Our editorial team typically responds within 24–48 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Send Us a Message
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Gear Recommendation / Review Request"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your setup or question..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <Button type="submit">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}