/**
 * ============================================================================
 * ফাইল: src/app/admin/layout.tsx
 * কাজ (Purpose): অ্যাডমিন ড্যাশবোর্ডের সব পেজের জন্য বাম পাশের সাইডবারসহ লেআউট তৈরি করা।
 * কেন গুরুত্বপূর্ণ: লগইন পেজে সাইডবার লুকিয়ে রাখে এবং বাকি সব অ্যাডমিন পেজে নেভিগেশন দেয়।
 * ============================================================================
 */

'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // লগইন পেজে থাকলে সাইডবার ছাড়াই ফুল-স্ক্রিন লগইন বক্স দেখাবে
  if (pathname === '/admin/login') {
    return <div className="min-h-[80vh] flex items-center justify-center p-4">{children}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-slate-100/70 dark:bg-slate-950">
      {/* বাম পাশের অ্যাডমিন নেভিগেশন সাইডবার */}
      <AdminSidebar />

      {/* ডান পাশের মেইন অ্যাডমিন কন্টেন্ট এরিয়া */}
      <div className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
    </div>
  );
}