// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Providers from './providers';
import ToastProvider from '@/components/Toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen
                   bg-gradient-to-b from-slate-200 via-white to-slate-300"
      >
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
