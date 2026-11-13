/**
 * ============================================================================
 * ফাইল: src/components/tracking/ClarityScript.tsx
 * কাজ (Purpose): Microsoft Clarity ফ্রি হিটম্যাপ এবং ইউজার সেশন ট্র্যাকিং স্ক্রিপ্ট লোড করা।
 * কেন গুরুত্বপূর্ণ: ভিজিটররা রিভিউ পেজের কোথায় ক্লিক করছে এবং কোথায় আটকে যাচ্ছে তা দেখা যায়।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx (রুট লেআউটে)
 * ============================================================================
 */

'use client';

import Script from 'next/script';
import trackingConfigData from '@/data/trackingConfig.json';

export default function ClarityScript() {
  const { enableTracking, microsoftClarityId } = trackingConfigData;

  if (!enableTracking || !microsoftClarityId || microsoftClarityId.trim() === '') {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${microsoftClarityId.trim()}");
        `,
      }}
    />
  );
}