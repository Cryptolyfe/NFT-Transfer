'use client';

import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from '@/components/Toast';   

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>               {/* wrap here */}
          {children}
        </ToastProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
