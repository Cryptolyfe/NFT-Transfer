// src/wagmiConfig.ts
import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';   // ← Base Sepolia testnet

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),                // wagmi will use https://sepolia.base.org
  },
  ssr: true,
});

// Type augmentation so wagmi recognizes this config
declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
