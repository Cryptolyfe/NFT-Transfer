// src/components/__tests__/ConnectWallet.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as wagmi from 'wagmi';              // <── import AFTER global mock
import ConnectWallet from '../ConnectWallet';
import { ProvidersWrapper } from '@/test-utils';

describe('ConnectWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks();                      // reset spies between tests
  });

  it('renders Connect Wallet button when disconnected', () => {
    vi.spyOn(wagmi, 'useAccount').mockReturnValue({
      isConnected:    false,
      isConnecting:   false,
      isDisconnected: true,
      isReconnecting: false,
      status:         'disconnected',

      address:   undefined,
      addresses: undefined,
      chain:     undefined,
      chainId:   undefined,
      connector: undefined,
    } as unknown as ReturnType<typeof wagmi.useAccount>);

    render(<ConnectWallet />, { wrapper: ProvidersWrapper });

    expect(
      screen.getByRole('button', { name: /connect wallet/i }),
    ).toBeInTheDocument();
  });

  it('shows Disconnect button when connected', () => {
    vi.spyOn(wagmi, 'useAccount').mockReturnValue({
      isConnected:    true,
      isConnecting:   false,
      isDisconnected: false,
      isReconnecting: false,
      status:         'connected',

      address:   '0x1234567890123456789012345678901234567890',
      addresses: ['0x1234567890123456789012345678901234567890'] as const,
      chain:     undefined,
      chainId:   1,
      connector: undefined,
    } as unknown as ReturnType<typeof wagmi.useAccount>);

    render(<ConnectWallet />, { wrapper: ProvidersWrapper });

    expect(
      screen.getByRole('button', { name: /disconnect/i }),
    ).toBeInTheDocument();
  });
});
