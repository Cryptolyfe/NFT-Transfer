// src/app/page.tsx
import ConnectWallet from '@/components/ConnectWallet';
import NFTGallery from '@/components/NFTGallery';

export default function HomePage() {
  return (
    <main
      className="min-h-screen px-4 py-8 flex flex-col items-center space-y-6
                 bg-gradient-to-b from-slate-200 via-white to-slate-300"
    >
      <h1 className="text-3xl font-bold text-center">NFT Transfer Tool</h1>
      <ConnectWallet />
      <NFTGallery />
    </main>
  );
}
