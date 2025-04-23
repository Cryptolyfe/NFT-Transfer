// src/components/NFTTransferForm.tsx

'use client';

import React, { useState } from 'react';
import { isAddress } from 'viem';

type Props = {
  tokenId: string;
};

export default function NFTTransferForm({ tokenId }: Props) {
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(recipient)) {
      setError('Invalid recipient address format');
      return;
    }

    setError('');
    // logic to transfer NFT
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <button type="submit" className="btn btn-primary w-full">
        Send NFT
      </button>
    </form>
  );
}
