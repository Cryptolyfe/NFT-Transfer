'use client';

import React, { useState } from 'react';
import { isAddress } from 'viem';
import {
  useAccount,
  useContractWrite,
  useSwitchChain,
} from 'wagmi';
import { erc721Abi } from '@/abi/erc721';            // safeTransferFrom is in std ERC-721
import { NFT_CONTRACT_ADDRESS, CHAIN_ID } from '@/constants';
import { useToast } from '@/components/Toast';

const SEPOLIA_ID = 84532;

export default function NFTTransferForm({ tokenId }: { tokenId: string }) {
  const { address: from, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const {
    writeContractAsync,
    isPending,
  } = useContractWrite();
  const toast = useToast();

  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient) return;
    if (!isAddress(recipient)) {
      setError('Invalid recipient address format');
      return;
    }

    try {
      /* 🔄 switch to Base Sepolia if needed */
      if (chainId !== SEPOLIA_ID) {
        await switchChainAsync({ chainId: SEPOLIA_ID });
      }

      setError('');
      const txHash = await writeContractAsync({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: erc721Abi,
        functionName: 'safeTransferFrom',
        args: [from ?? '', recipient, BigInt(tokenId)],
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
            Transfer tx sent
          </a>
        ),
      });

      /* refresh gallery to reflect transfer */
      window.dispatchEvent(new Event('refresh-nfts'));
    } catch (err: any) {
      setError(err?.shortMessage ?? 'Transaction failed');
      toast({ type: 'error', msg: err?.shortMessage ?? 'Transaction failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
        Recipient Address
      </label>
      <input
        id="recipient"
        type="text"
        placeholder="0x…"
        className="input input-bordered w-full"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      {error && (
        <p role="alert" className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
        {isPending ? 'Sending…' : 'Send NFT'}
      </button>
    </form>
  );
}
