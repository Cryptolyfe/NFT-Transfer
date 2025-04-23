'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { Button } from 'react-daisyui';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {isConnected ? (
        <>
          <p className="mb-2 text-sm">Connected Wallet:</p>
          <p className="mb-4 text-xs font-mono text-green-500">{address}</p>
          <Button color="error" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button color="primary" onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
