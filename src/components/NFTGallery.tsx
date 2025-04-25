// src/components/NFTGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useNfts } from '@/hooks/useNfts';
import NFTTransferForm from './NFTTransferForm';
import MintButton from './MintButton';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type NFT = { tokenId: string; name: string; image: string };

interface Props {
  nfts?: NFT[];
  onSelect?: (tokenId: string) => void;
  selectedId?: string | null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function NFTGallery({
  nfts: overrideNfts,
  onSelect,
  selectedId,
}: Props) {
  const { address, isConnected } = useAccount();
  const [localSelected, setLocalSelected] = useState<string | null>(null);

  const { nfts: fetchedNfts, loading, error } = useNfts();
  const nfts = overrideNfts ?? fetchedNfts;
  const activeId = selectedId ?? localSelected;

  /* ------------------------------------------------------------------ */
  /*  States                                                             */
  /* ------------------------------------------------------------------ */
  if (loading && !overrideNfts) return <p className="text-center">Loading NFTs…</p>;
  if (error && !overrideNfts)   return <p className="text-center text-red-500">Failed to load NFTs.</p>;
  if (!nfts.length)             return <p className="text-center">No NFTs found.</p>;

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="p-4 space-y-6">
      {isConnected && (
        <>
          <p className="text-sm text-gray-400 break-all">
            Connected&nbsp;wallet:&nbsp;<code>{address}</code>
          </p>
          <MintButton />
        </>
      )}

      {/* ---------- centered grid ---------- */}
      <div className="flex justify-center">
        <div className="grid w-full max-w-[960px]  /* or max-w-screen-lg */
                        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nfts.map((nft) => {
            const selected = activeId === nft.tokenId;
            const imgSrc =
              nft.image && /^https?:\/\//.test(nft.image)
                ? nft.image
                : '/placeholder.svg';

            return (
              <div
                key={nft.tokenId}
                className="flex justify-center"
                onClick={() => {
                  setLocalSelected(nft.tokenId);
                  onSelect?.(nft.tokenId);
                }}
              >
                <div
                  className="relative inline-flex flex-col items-center rounded-lg p-2 transition"
                  style={selected ? { width: 208, border: '4px solid #3B82F6' } : { width: 208 }}
                >
                  {/* small ID badge */}
                  <span className="badge badge-primary badge-sm absolute top-2 right-2 z-10">
                    #{nft.tokenId}
                  </span>

                  {/* artwork or fallback icon */}
                  <Image
                    src={imgSrc}
                    alt={nft.name || `Token ${nft.tokenId}`}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />

                  <p className="mt-2 text-sm text-center w-full">
                    {nft.name || `Token #${nft.tokenId}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* transfer form */}
      {activeId && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Transfer&nbsp;NFT</h3>
          <NFTTransferForm tokenId={activeId} />
        </div>
      )}
    </div>
  );
}
