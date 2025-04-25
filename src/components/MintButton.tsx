'use client';

import React, { useState } from 'react';
import {
  useAccount,
  useContractWrite,
  useSwitchChain,
} from 'wagmi';
import { NFT_CONTRACT_ADDRESS } from '@/constants';
import { testNftAbi } from '@/abi/testNftAbi';
import { useToast } from '@/components/Toast';

const SEPOLIA_ID = 84532;

export default function MintButton() {
  const { isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending } = useContractWrite();
  const toast = useToast();
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    try {
      /* 🔄 prompt network switch if user isn’t on Base Sepolia */
      if (chainId !== SEPOLIA_ID) {
        await switchChainAsync({ chainId: SEPOLIA_ID });
      }

      setMinting(true);

      const txHash = await writeContractAsync({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: testNftAbi,
        functionName: 'mint',
        args: [],
      });

      toast({
        type: 'success',
        msg: (
          <a
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Mint tx sent
          </a>
        ),
      });

      /* 🔄 trigger gallery refresh */
      window.dispatchEvent(new Event('refresh-nfts'));
    } catch (err: any) {
      toast({ type: 'error', msg: err?.shortMessage ?? 'Mint failed' });
    } finally {
      setMinting(false);
    }
  };

  return (
    <button
      className="btn btn-outline btn-secondary mb-4"
      disabled={!isConnected || minting || isPending}
      onClick={handleMint}
    >
      {minting || isPending ? 'Minting…' : 'Mint Demo NFT'}
    </button>
  );
}
