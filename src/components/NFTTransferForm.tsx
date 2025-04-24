// src/components/NFTTransferForm.tsx
'use client';

import React, { useState } from 'react';
import { isAddress } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import { erc721Abi } from '@/abi/erc721';              // ← 1

type Props = {
  tokenId: string;
  contract?: `0x${string}`;
};

export default function NFTTransferForm({
  tokenId,
  contract = '0xYourNftContractAddress',
}: Props) {
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const { address: from }       = useAccount();
  const { writeContractAsync }  = useWriteContract();   // ← 2

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(recipient)) {
      setError('Invalid recipient address format');
      return;
    }
    setError('');
    setPending(true);

    try {
      await writeContractAsync({
        address: contract,
        abi: erc721Abi,
        functionName: 'safeTransferFrom',
        args: [from, recipient, BigInt(tokenId)],
      });
    } catch (err) {
      console.error(err);
      setError('Transaction failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="nft-transfer-form" className="space-y-4">
      <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
        Recipient Address
      </label>
      <input
        id="recipient"
        type="text"
        placeholder="0x..."
        className="input input-bordered w-full"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      {error && (
        <p role="alert" className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? 'Sending…' : 'Send NFT'}
      </button>
    </form>
  );
}
