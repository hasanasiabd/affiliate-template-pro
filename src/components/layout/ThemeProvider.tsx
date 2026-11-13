/**
 * ============================================================================
 * ফাইল: src/components/layout/ThemeProvider.tsx
 * কাজ (Purpose): পুরো অ্যাপ্লিকেশনে Dark এবং Light Mode থিম স্টেট সরবরাহ করা।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx
 * ============================================================================
 */

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}