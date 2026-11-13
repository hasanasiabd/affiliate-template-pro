/**
 * ============================================================================
 * ফাইল: src/components/admin/PixelSettingsForm.tsx
 * কাজ (Purpose): অ্যাডমিন প্যানেল থেকে Meta Pixel, GA4 এবং SEO ভেরিফিকেশন ট্যাগ সেটআপ করা।
 * কেন গুরুত্বপূর্ণ: নন-কোডার বা মার্কেটাররা ১ ক্লিকে তাদের ট্র্যাকিং পিক্সেল যুক্ত করতে পারবেন।
 * কোথায় ব্যবহৃত হবে: src/app/admin/pixels/page.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { TrackingConfig } from '@/types/config.types';
import Button from '@/components/ui/Button';
import { Save, CheckCircle2, Activity } from 'lucide-react';

interface PixelSettingsFormProps {
  initialData: TrackingConfig;
}

export default function PixelSettingsForm({ initialData }: PixelSettingsFormProps) {
  const [formData, setFormData] = useState<TrackingConfig>(initialData);
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
          fileName: 'trackingConfig.json',
          data: formData,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatusMsg(result.message || 'Tracking & Pixel settings saved successfully!');
      } else {
        setStatusMsg(result.message || 'Failed to save settings.');
      }
    } catch {
      setStatusMsg('Network error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl"
    >
      {/* মাস্টার ট্র্যাকিং সুইচ */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Enable Global Analytics & Pixels
            </p>
            <p className="text-xs text-slate-500">
              Turn off to pause all tracking scripts across the site.
            </p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={formData.enableTracking}
          onChange={(e) =>
            setFormData({ ...formData, enableTracking: e.target.checked })
          }
          className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
        />
      </div>

      {/* পিক্সেল ইনপুট ফিল্ডসমূহ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Meta (Facebook) Pixel ID
          </label>
          <input
            type="text"
            value={formData.metaPixelId}
            onChange={(e) =>
              setFormData({ ...formData, metaPixelId: e.target.value })
            }
            placeholder="e.g. 123456789012345"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Google Analytics 4 (GA4) ID
          </label>
          <input
            type="text"
            value={formData.googleAnalyticsId}
            onChange={(e) =>
              setFormData({ ...formData, googleAnalyticsId: e.target.value })
            }
            placeholder="e.g. G-XXXXXXXXXX"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Microsoft Clarity Project ID
          </label>
          <input
            type="text"
            value={formData.microsoftClarityId}
            onChange={(e) =>
              setFormData({ ...formData, microsoftClarityId: e.target.value })
            }
            placeholder="e.g. k9x8y7z6w5"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Google Search Console Verification Code
          </label>
          <input
            type="text"
            value={formData.googleSiteVerification}
            onChange={(e) =>
              setFormData({ ...formData, googleSiteVerification: e.target.value })
            }
            placeholder="Meta verification string"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>
      </div>

      {/* স্ট্যাটাস মেসেজ ও সেভ বাটন */}
      {statusMsg && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <Button type="submit" disabled={isSaving}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Saving to Config...' : 'Save Pixel & SEO Settings'}
      </Button>
    </form>
  );
}