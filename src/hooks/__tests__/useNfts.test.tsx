// src/hooks/__tests__/useNfts.test.ts
import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNfts } from '@/hooks/useNfts';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a test client once
const testClient = new QueryClient();

// Wrap with providers
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={testClient}>
      {children}
    </QueryClientProvider>
  </WagmiProvider>
);

// Tests
describe('useNfts', () => {
  it('returns nfts, loading, and error keys', () => {
    const { result } = renderHook(() => useNfts(), { wrapper });

    expect(result.current).toHaveProperty('nfts');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
  });
});

it("returns NFT data on success", async () => {
  // mock fetch or viem call to return fake NFTs
  // assert result.current.nfts.length > 0
});

it("returns error on failure", async () => {
  // mock fetch to throw error
  // assert result.current.error is defined
});
