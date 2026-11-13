/**
 * ============================================================================
 * ফাইল: src/components/tracking/GoogleAnalyticsScript.tsx
 * কাজ (Purpose): Google Analytics 4 (GA4) ট্র্যাকিং কোড সাইটে লোড করা।
 * কেন গুরুত্বপূর্ণ: গুগল অর্গানিক সার্চ ট্রাফিক এবং ভিজিটরের আচরণ বিশ্লেষণ করতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx (রুট লেআউটে)
 * এডিট গাইড: অ্যাডমিন প্যানেলে G-XXXXXXXXXX ফরম্যাটের আইডি দিলে এটি অটো চালু হবে।
 * ============================================================================
 */

'use client';

import Script from 'next/script';
import trackingConfigData from '@/data/trackingConfig.json';

export default function GoogleAnalyticsScript() {
  const { enableTracking, googleAnalyticsId } = trackingConfigData;

  if (!enableTracking || !googleAnalyticsId || googleAnalyticsId.trim() === '') {
    return null;
  }

  const gaId = googleAnalyticsId.trim();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}