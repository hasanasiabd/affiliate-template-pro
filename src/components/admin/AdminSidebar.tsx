/**
 * ============================================================================
 * ফাইল: src/components/admin/AdminSidebar.tsx
 * কাজ (Purpose): অ্যাডমিন ড্যাশবোর্ডের বাম পাশের সাইডবার মেনু এবং লগআউট বাটন দেখানো।
 * কেন গুরুত্বপূর্ণ: অ্যাডমিন বা টেম্পলেট ক্রেতা সহজেই সব সেটিংস ট্যাবে নেভিগেট করতে পারবেন।
 * কোথায় ব্যবহৃত হবে: src/app/admin/layout.tsx
 * ============================================================================
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  PackagePlus,
  Activity,
  Settings,
  Bot,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

const adminLinks = [
  { label: 'Overview & Clicks', href: '/admin', icon: LayoutDashboard },
  { label: 'Manage Products', href: '/admin/products', icon: PackagePlus },
  { label: 'Pixels & SEO Tags', href: '/admin/pixels', icon: Activity },
  { label: 'Affiliate & Brand', href: '/admin/settings', icon: Settings },
  { label: 'AI Concierge Control', href: '/admin/ai-agent', icon: Bot },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // লগআউট করার হ্যান্ডলার (সেশন কুকি ক্লিয়ার করে লগইন পেজে পাঠাবে)
  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-200 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0">
      <div className="p-5">
        {/* ১. অ্যাডমিন ব্র্যান্ড হেডার */}
        <div className="flex items-center gap-2.5 pb-5 mb-5 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white leading-none">
              Admin Studio
            </h2>
            <span className="text-[11px] text-emerald-400 font-medium">
              Zero-DB Control Center
            </span>
          </div>
        </div>

        {/* ২. নেভিগেশন লিংকসমূহ */}
        <nav className="space-y-1.5">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition',
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ৩. নিচের লাইভ সাইট প্রিভিউ এবং লগআউট বাটন */}
      <div className="p-5 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
        >
          View Live Website <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
}