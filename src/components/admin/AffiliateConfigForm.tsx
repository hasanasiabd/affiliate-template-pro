/**
 * ============================================================================
 * ফাইল: src/components/admin/AffiliateConfigForm.tsx
 * কাজ (Purpose): গ্লোবাল অ্যামাজন ট্যাগ, সাইটের নাম, ডিসক্লোজার এবং লেখকের প্রোফাইল এডিট করা।
 * কেন গুরুত্বপূর্ণ: টেম্পলেট ক্রেতারা কোড এডিট না করেই এখান থেকে এক ক্লিকে নিজেদের অ্যামাজন
 *               ট্যাগ ও ব্র্যান্ডিং সেটআপ করতে পারবেন।
 * কোথায় ব্যবহৃত হবে: src/app/admin/settings/page.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { SiteConfig } from '@/types/config.types';
import Button from '@/components/ui/Button';
import { Save, CheckCircle2, Tag, Globe, UserCheck } from 'lucide-react';

interface AffiliateConfigFormProps {
  initialData: SiteConfig;
}

export default function AffiliateConfigForm({
  initialData,
}: AffiliateConfigFormProps) {
  const [formData, setFormData] = useState<SiteConfig>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: 'siteConfig.json',
          data: formData,
        }),
      });

      const result = await res.json();
      setStatusMsg(
        res.ok
          ? result.message || 'Global Affiliate & Brand settings updated!'
          : result.message || 'Failed to save configuration.'
      );
    } catch {
      setStatusMsg('Network error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 max-w-3xl"
    >
      {/* ১. মাস্টার অ্যামাজন অ্যাসোসিয়েট ট্যাগ সেকশন */}
      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/25 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
          <Tag className="w-5 h-5" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Master Amazon Associate Tag
          </h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Global Store / Tracking ID (Automatically appended to all product links)
          </label>
          <input
            type="text"
            required
            value={formData.amazonAssociateTag}
            onChange={(e) =>
              setFormData({ ...formData, amazonAssociateTag: e.target.value })
            }
            placeholder="e.g. devgear2026-20"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold text-emerald-600 dark:text-emerald-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Mandatory Affiliate Disclosure Text
          </label>
          <textarea
            rows={2}
            value={formData.disclosureText}
            onChange={(e) =>
              setFormData({ ...formData, disclosureText: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* ২. সাইট ব্র্যান্ডিং ও এসইও ইনফো */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Globe className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider">
            Brand Identity & SEO Metadata
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Site Name
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) =>
                setFormData({ ...formData, siteName: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Navbar Logo Text
            </label>
            <input
              type="text"
              value={formData.logoText}
              onChange={(e) =>
                setFormData({ ...formData, logoText: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Hero Tagline (H1 Headline)
          </label>
          <input
            type="text"
            value={formData.siteTagline}
            onChange={(e) =>
              setFormData({ ...formData, siteTagline: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>
      </div>

      {/* ৩. লেখকের প্রোফাইল (E-E-A-T Author Settings) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-200 dark:border-slate-800">
          <UserCheck className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider">
            Lead Reviewer Profile (Google E-E-A-T Signal)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Reviewer Name
            </label>
            <input
              type="text"
              value={formData.author.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: { ...formData.author, name: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Role / Credentials
            </label>
            <input
              type="text"
              value={formData.author.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: { ...formData.author, role: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
            />
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <Button type="submit" disabled={isSaving}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Updating Config...' : 'Save Brand & Affiliate Settings'}
      </Button>
    </form>
  );
}