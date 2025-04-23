'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useNfts } from '@/hooks/useNfts';
import { Button } from 'react-daisyui';

export default function NFTGallery() {
  const { nfts, loading, error } = useNfts();
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);

  if (loading) return <p className="text-center">Loading NFTs...</p>;
  if (error) return <p className="text-center text-red-500">Error loading NFTs.</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {nfts.map((nft) => (
        <div
          key={nft.tokenId}
          onClick={() => setSelectedTokenId(nft.tokenId)}
          className={`p-2 border rounded-lg cursor-pointer ${
            selectedTokenId === nft.tokenId ? 'border-primary' : 'border-base-300'
          }`}
        >
          <Image
            src={nft.image}
            alt={nft.name}
            width={200}
            height={200}
            className="w-full h-auto object-cover rounded"
          />
          <h2 className="mt-2 text-center text-sm">{nft.name}</h2>
        </div>
      ))}

      {selectedTokenId && (
        <div className="col-span-2 mt-4 text-center">
          <p className="mb-2">Selected Token ID: {selectedTokenId}</p>
          <Button color="accent">Next: Transfer NFT</Button>
        </div>
      )}
    </div>
  );
}
