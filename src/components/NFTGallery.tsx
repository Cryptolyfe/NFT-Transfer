// src/components/NFTGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useNfts } from '@/hooks/useNfts';
import NFTTransferForm from './NFTTransferForm';

type Props = {
  nfts?: { tokenId: string; name: string; image: string }[];
  onSelect?: (tokenId: string) => void;
};

export default function NFTGallery({ nfts: overrideNfts, onSelect }: Props) {
  const { address } = useAccount();
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const { nfts: fetchedNfts, loading, error } = useNfts();

  const nfts = overrideNfts ?? fetchedNfts;

  if (loading && !overrideNfts) {
    return <p className="text-center">Loading NFTs...</p>;
  }
  if (error && !overrideNfts) {
    return <p className="text-center text-red-500">Failed to load NFTs.</p>;
  }
  if (!nfts.length) {
    return <p className="text-center">No NFTs found.</p>;
  }

  return (
    <div className="p-4 space-y-6">
      {address && (
        <p className="text-sm text-gray-600 break-all">
          Connected wallet: <code>{address}</code>
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <div
            key={nft.tokenId}
            className={`border rounded-lg p-2 cursor-pointer hover:shadow-md ${
              selectedTokenId === nft.tokenId ? 'border-primary' : ''
            }`}
            onClick={() => {
              setSelectedTokenId(nft.tokenId);
              onSelect?.(nft.tokenId);
            }}
          >
            {nft.image && (
              <Image
                src={nft.image}
                alt={nft.name || `Token ${nft.tokenId}`}
                width={200}
                height={200}
                className="rounded"
              />
            )}
            <p className="mt-2 text-center text-sm">
              {nft.name || `Token #${nft.tokenId}`}
            </p>
          </div>
        ))}
      </div>

      {selectedTokenId && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Transfer NFT</h3>
          <NFTTransferForm tokenId={selectedTokenId} />
        </div>
      )}
    </div>
  );
}
