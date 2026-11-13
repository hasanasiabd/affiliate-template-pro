/**
 * ============================================================================
 * ফাইল: src/app/api/admin/login/route.ts
 * কাজ (Purpose): অ্যাডমিন প্যানেলে লগইন করার সময় পাসওয়ার্ড যাচাই এবং সেশন কুকি সেট করা।
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminCredentials,
  getExpectedSessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/admin/authSession';

// ১. লগইন রিকোয়েস্ট হ্যান্ডেল (POST)
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const token = getExpectedSessionToken();
    const response = NextResponse.json({ success: true, message: 'Login successful' });

    // কুকিতে সিকিউর সেশন টোকেন সেট করা (৭ দিনের জন্য)
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ২. লগআউট রিকোয়েস্ট হ্যান্ডেল (DELETE)
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    maxAge: 0,
    path: '/',
  });

  return response;
}