import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { ProvidersWrapper } from '@/test-utils';

vi.mock('wagmi', async () => {
  const actual = await vi.importActual<typeof import('wagmi')>('wagmi');
  return {
    ...actual,
    useAccount: vi.fn(),
    useConnect: () => ({ connect: vi.fn() }),
    useDisconnect: () => ({
      disconnect: vi.fn(),
      disconnectAsync: vi.fn(),
      data: undefined,
      error: null,
      isError: false,
      isIdle: false,
      isPending: false,
      isSuccess: true,
      status: 'success',
      reset: vi.fn(),
      variables: undefined,
      failureCount: 0,
      failureReason: null,
      context: undefined,
    }),
  };
});

import * as wagmi from 'wagmi';
import ConnectWallet from '../ConnectWallet';

describe('ConnectWallet', () => {
  it('renders the Connect Wallet button when disconnected', () => {
    (wagmi.useAccount as Mock).mockReturnValue({
      isConnected: false,
      isConnecting: false,
      isDisconnected: true,
      isReconnecting: false,
      status: 'disconnected',
      address: undefined,
      addresses: undefined,
      chain: undefined,
      chainId: undefined,
      connector: undefined,
    });

    render(<ConnectWallet />, { wrapper: ProvidersWrapper });
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
  });

  it('shows disconnect button when connected', () => {
    (wagmi.useAccount as Mock).mockReturnValue({
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
      isReconnecting: false,
      status: 'connected',
      address: '0x1234567890123456789012345678901234567890',
      addresses: ['0x1234567890123456789012345678901234567890'],
      chain: undefined,
      chainId: 1,
      connector: undefined,
    });

    render(<ConnectWallet />, { wrapper: ProvidersWrapper });
    expect(screen.getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
  });
});
