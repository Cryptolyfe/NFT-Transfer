import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { ALCHEMY_BASE_URL, NFT_CONTRACT_ADDRESS } from '@/constants';

interface NFT {
  tokenId: string;
  image: string;
  name: string;
}

export const useNfts = () => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNfts = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${ALCHEMY_BASE_URL}/getNFTsForOwner?owner=${address}&contractAddresses[]=${NFT_CONTRACT_ADDRESS}`
        );
        const data = await res.json();
        const ownedNfts = data.ownedNfts?.map((nft: any) => ({
          tokenId: nft.id.tokenId,
          name: nft.title,
          image: nft.media[0]?.gateway || '',
        }));
        setNfts(ownedNfts || []);
      } catch (err: any) {
        setError(err.message || 'Error fetching NFTs');
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [address]);

  return { nfts, loading, error };
};
