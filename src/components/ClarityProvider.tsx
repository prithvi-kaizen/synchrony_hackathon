'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    clarity: (action: string, ...args: unknown[]) => void;
  }
}

export function ClarityProvider() {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID || 'rzjz2antsr';

    if (clarityId && typeof window !== 'undefined') {
      // Initialize Clarity
      (function (c: Window & Record<string, unknown>, l: Document, a: string, r: string, i: string) {
        c[a] =
          c[a] ||
          function (...args: unknown[]) {
            (c[a] as { q?: unknown[] }).q = (c[a] as { q?: unknown[] }).q || [];
            (c[a] as { q: unknown[] }).q.push(args);
          };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src = 'https://www.clarity.ms/tag/' + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode?.insertBefore(t, y);
      })(window as unknown as Window & Record<string, unknown>, document, 'clarity', 'script', clarityId);
    }
  }, []);

  return null;
}
