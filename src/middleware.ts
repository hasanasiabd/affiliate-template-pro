/**
 * ============================================================================
 * ফাইল: src/middleware.ts
 * কাজ (Purpose): পাসওয়ার্ড টোকেন ছাড়া /admin পেজ এবং অ্যাডমিন API অ্যাক্সেস ব্লক করা।
 * কেন গুরুত্বপূর্ণ: পুরো অ্যাডমিন ড্যাশবোর্ডকে অননুমোদিত ইউজারদের হাত থেকে সুরক্ষিত রাখে।
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, isValidAdminToken } from '@/lib/admin/authSession';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ১. লগইন পেজ এবং লগইন API সবার জন্য উন্মুক্ত থাকবে
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // ২. কুকি থেকে অ্যাডমিন সেশন টোকেন যাচাই করা
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = isValidAdminToken(token);

  // ৩. ভেরিফাইড না হলে /admin পেজের রিকোয়েস্টকে লগইন পেজে রিডাইরেক্ট করা
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ৪. ভেরিফাইড না হলে /api/admin/* রিকোয়েস্টে 401 Unauthorized রিটার্ন করা
  if (pathname.startsWith('/api/admin') && !isAuthenticated) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized admin request.' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};