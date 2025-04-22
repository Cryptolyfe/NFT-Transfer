import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import type { PublicClient, Chain } from 'viem';

// ✅ This fixes editor type complaints for generic typing
export const publicClient: PublicClient<Chain> = createPublicClient({
  chain: base,
  transport: http(),
});

export const wagmiConfig = createConfig({
  chains: [base],
  publicClient,
  ssr: true,
});

// ✅ Optional but recommended: tells wagmi hooks what config you're using
declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
