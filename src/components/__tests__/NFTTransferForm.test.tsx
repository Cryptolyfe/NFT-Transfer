// src/components/__tests__/NFTTransferForm.test.tsx
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import NFTTransferForm from '../NFTTransferForm';
import { ProvidersWrapper } from '@/test-utils';
import { mockWriteContractAsync } from '@root/setupTests';

describe('NFTTransferForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows validation error when the address field is blank', () => {
    const { container } = render(<NFTTransferForm tokenId="1" />, {
      wrapper: ProvidersWrapper,
    });

    // Submit without typing anything
    fireEvent.submit(container.querySelector('form')!);

    // Should not call the contract
    expect(mockWriteContractAsync).not.toHaveBeenCalled();
    // Should show validation error for empty input
    expect(screen.getByRole('alert')).toHaveTextContent(/invalid recipient address format/i);
  });

  it('submits form with valid address and triggers a contract write', async () => {
    const { container } = render(<NFTTransferForm tokenId="1" />, {
      wrapper: ProvidersWrapper,
    });

    await userEvent.type(
      screen.getByLabelText(/recipient address/i),
      '0x52908400098527886E0F7030069857D2E4169EE7',
    );

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(mockWriteContractAsync).toHaveBeenCalled();
    });
  });

  it('shows error when the contract call fails', async () => {
    mockWriteContractAsync.mockRejectedValueOnce(new Error('Boom'));

    const { container } = render(<NFTTransferForm tokenId="1" />, {
      wrapper: ProvidersWrapper,
    });

    await userEvent.type(
      screen.getByLabelText(/recipient address/i),
      '0x52908400098527886E0F7030069857D2E4169EE7',
    );

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/transaction failed/i);
    });
  });
});
