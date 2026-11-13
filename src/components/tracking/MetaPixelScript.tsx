/**
 * ============================================================================
 * ফাইল: src/components/tracking/MetaPixelScript.tsx
 * কাজ (Purpose): ফেসবুক/মেটা পিক্সেল (Meta Pixel) স্ক্রিপ্ট সাইটে ডাইনামিকভাবে লোড করা।
 * কেন গুরুত্বপূর্ণ: ফেসবুক অ্যাড রিটার্গেটিং এবং কতজন ইউজার অ্যামাজন লিংকে ক্লিক করছে তা ট্র্যাক করে।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx (রুট লেআউটে)
 * এডিট গাইড: এই ফাইলে হাত দেওয়ার প্রয়োজন নেই; অ্যাডমিন প্যানেল থেকে Pixel ID বসালেই এটি চালু হবে।
 * ============================================================================
 */

'use client';

import Script from 'next/script';
import trackingConfigData from '@/data/trackingConfig.json';

export default function MetaPixelScript() {
  const { enableTracking, metaPixelId } = trackingConfigData;

  // ট্র্যাকিং বন্ধ থাকলে বা পিক্সেল আইডি ফাঁকা থাকলে স্ক্রিপ্ট লোড হবে না
  if (!enableTracking || !metaPixelId || metaPixelId.trim() === '') {
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId.trim()}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* ব্রাউজারে জাভাস্ক্রিপ্ট বন্ধ থাকলে ব্যাকআপ ট্র্যাকিং ইমেজ */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${metaPixelId.trim()}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}