// src/components/__tests__/NFTTransferForm.test.tsx
import React, { ComponentType } from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import * as wagmi from 'wagmi';
import { ProvidersWrapper } from '@/test-utils';

/* spy for wagmi mutation */
const mockWriteContractAsync = vi.fn().mockResolvedValue('0xMockedTxHash');
let NFTTransferForm: ComponentType<{ tokenId: string }>;

describe('NFTTransferForm', () => {
  beforeEach(async () => {
    vi.restoreAllMocks();

    /* -- wagmi hooks ------------------------------------------------ */
    vi.spyOn(wagmi, 'useAccount').mockReturnValue({
      address: '0xabc123abc123abc123abc123abc123abc123abc1',
      addresses: ['0xabc123abc123abc123abc123abc123abc123abc1'] as const,
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
      isReconnecting: false,
      status: 'connected',
      chain: undefined,
      chainId: 1,
      connector: {} as any,
    });

    vi.spyOn(wagmi, 'useContractWrite').mockReturnValue({
      writeContractAsync: mockWriteContractAsync,
      reset: vi.fn(),
      error: null,
      status: 'success',
      data: '0xMockedTxHash',
      variables: {
        abi: [] as any,
        address: '0xcontract' as `0x${string}`,
        functionName: 'safeTransferFrom',
      },
      isPending: false,
      isError: false,
      isSuccess: true,
      isIdle: false,
      context: undefined,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      submittedAt: 0,
    } as any);

    /* dynamic import AFTER mocks */
    const mod: any = await import('../NFTTransferForm');
    NFTTransferForm = mod.default as ComponentType<{ tokenId: string }>;
  });

  afterEach(() => vi.clearAllMocks());

  it('shows form inputs and lets you enter address', () => {
    render(<NFTTransferForm tokenId="1" />, { wrapper: ProvidersWrapper });

    const input = screen.getByLabelText(/recipient address/i);
    fireEvent.change(input, {
      target: { value: '0x1234567890123456789012345678901234567890' },
    });

    expect(input).toHaveValue(
      '0x1234567890123456789012345678901234567890'
    );
  });

  it('shows error for invalid recipient address', async () => {
    render(<NFTTransferForm tokenId="1" />, { wrapper: ProvidersWrapper });

    fireEvent.change(screen.getByLabelText(/recipient address/i), {
      target: { value: 'invalid-address' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send nft/i }));

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent(/invalid recipient address format/i);
  });

  it('submits form with valid address and calls writeContractAsync', async () => {
    render(<NFTTransferForm tokenId="1" />, { wrapper: ProvidersWrapper });

    fireEvent.change(screen.getByLabelText(/recipient address/i), {
      target: { value: '0x1234567890123456789012345678901234567890' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send nft/i }));

    await waitFor(() => {
      expect(mockWriteContractAsync).toHaveBeenCalled();
    });
  });
});
