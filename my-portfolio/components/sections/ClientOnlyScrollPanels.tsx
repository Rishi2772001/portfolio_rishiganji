'use client';                       // ← this file runs only in the browser

import dynamic from 'next/dynamic';

/* Dynamically load the heavy / browser-only code */
const ScrollPanels = dynamic(
  () => import('@/components/sections/ScrollPanels'),
  { ssr: false }                   // <-- allowed here because it's a client file
);

/* Simple pass-through */
export default function ClientOnlyScrollPanels(props: React.ComponentProps<typeof ScrollPanels>) {
  return <ScrollPanels {...props} />;
}
