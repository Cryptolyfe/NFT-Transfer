// setupTests.ts  – loaded globally by Vitest via vite.config.mts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

/* ─────────────── shared spies ─────────────── */
export const mockWriteContract      = vi.fn();
export const mockWriteContractAsync = vi.fn().mockResolvedValue('0xMockedTxHash');

/* ─────────────── global wagmi mock ─────────────── */
vi.mock('wagmi', async (importActual) => {
  const actual = await importActual<any>();
  return {
    ...actual,

    /* Connected-wallet default */
    useAccount: () => ({
      address:        '0x52908400098527886E0F7030069857D2E4169EE7',
      addresses:      ['0x52908400098527886E0F7030069857D2E4169EE7'] as const,
      chain:          undefined,
      chainId:        1,
      connector:      {} as any,
      isConnected:    true,
      isConnecting:   false,
      isDisconnected: false,
      isReconnecting: false,
      status:         'connected',
    }),

    /* useWriteContract hook */
    useWriteContract: () => ({
      /* wagmi v2 exposes both pairs – map them to the same spies */
      write:              mockWriteContract,
      writeAsync:         mockWriteContractAsync,
      writeContract:      mockWriteContract,
      writeContractAsync: mockWriteContractAsync,

      reset: vi.fn(),

      /* minimal status shape */
      error:     null,
      status:    'idle',
      data:      undefined,
      isIdle:    true,
      isPending: false,
      isSuccess: false,
      isError:   false,
    }),
  };
});
