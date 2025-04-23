import ConnectWallet from '@/components/ConnectWallet';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">🎉 Tailwind is Working!</h1>
        <ConnectWallet />
      </div>
    </main>
  );
}
