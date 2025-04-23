'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc721Abi } from '@/abi/erc721';
import { CONTRACT_ADDRESS } from '@/constants';

type Props = {
  tokenId: string;
};

export default function NFTTransferForm({ tokenId }: Props) {
  const { address } = useAccount();
  const [toAddress, setToAddress] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async () => {
    setError('');
    try {
      await writeContract({
        abi: erc721Abi,
        address: CONTRACT_ADDRESS,
        functionName: 'safeTransferFrom',
        args: [address!, toAddress, tokenId],
      });
      setTxHash(hash as string);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Transfer failed');
    }
  };

  return (
    <div className="space-y-4">
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="Recipient address (0x...)"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleTransfer} disabled={isPending || isConfirming}>
        {isPending || isConfirming ? 'Transferring...' : 'Transfer NFT'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {isSuccess && <p className="text-green-500 text-sm">✅ Transfer confirmed!</p>}
      {txHash && (
        <p className="text-xs">
          Tx Hash: <a href={`https://basescan.org/tx/${txHash}`} target="_blank" className="link">{txHash}</a>
        </p>
      )}
    </div>
  );
}
