'use client'; // ✅ this line MUST be first

import './globals.css';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../wagmiConfig';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ THIS is the JSX part that uses WagmiConfig */}
        <WagmiConfig config={wagmiConfig}>
          {children}
        </WagmiConfig>
      </body>
    </html>
  );
}
