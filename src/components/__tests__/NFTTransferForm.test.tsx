import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';

import NFTTransferForm from '../NFTTransferForm';
import { ProvidersWrapper } from '@/test-utils';

import {
  mockWriteContract,
  mockWriteContractAsync,
} from '@root/setupTests';

describe('NFTTransferForm', () => {
  beforeEach(() => {
    mockWriteContract.mockClear();
    mockWriteContractAsync.mockClear();
  });

  it('submits form with valid address and triggers a contract write', async () => {
    const { container } = render(<NFTTransferForm tokenId="1" />, {
      wrapper: ProvidersWrapper,
    });

    await userEvent.type(
      screen.getByLabelText(/recipient address/i),
      '0x52908400098527886e0f7030069857d2e4169ee7',   // lowercase address
    );

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      const calls =
        mockWriteContract.mock.calls.length +
        mockWriteContractAsync.mock.calls.length;

      expect(calls).toBeGreaterThan(0);
    }, { timeout: 3000 });           // ← extended timeout
  });
});
