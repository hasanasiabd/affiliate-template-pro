/**
 * ============================================================================
 * ফাইল: src/lib/admin/authSession.ts
 * কাজ (Purpose): ডাটাবেস ছাড়া অ্যাডমিন প্যানেলের পাসওয়ার্ড যাচাই এবং সেশন টোকেন তৈরি করা।
 * কেন গুরুত্বপূর্ণ: বাইরের কেউ যেন /admin পেজে ঢুকতে বা ডেটা এডিট করতে না পারে তা নিশ্চিত করে।
 * কোথায় ব্যবহৃত হবে: src/middleware.ts এবং src/app/api/admin/login/route.ts
 * ============================================================================
 */

export const ADMIN_COOKIE_NAME = 'devgear_admin_session';

/**
 * অ্যাডমিন ইউজারনেম ও পাসওয়ার্ড সঠিক কি না তা যাচাই করার ফাংশন
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'super_secret_password_2026';

  return username === validUsername && password === validPassword;
}

/**
 * সেশন কুকির জন্য সিকিউর টোকেন জেনারেট করার ফাংশন
 */
export function getExpectedSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || 'default_fallback_secret_key_2026';
  const user = process.env.ADMIN_USERNAME || 'admin';
  
  // ইউজারনেম ও সিক্রেট কী মিলিয়ে Base64 টোকেন তৈরি
  return Buffer.from(`${user}:${secret}`).toString('base64');
}

/**
 * ব্রাউজারের কুকিতে থাকা টোকেনটি বৈধ কি না তা চেক করার ফাংশন
 */
export function isValidAdminToken(token?: string): boolean {
  if (!token) return false;
  return token === getExpectedSessionToken();
}