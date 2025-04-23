// src/components/__tests__/NFTTransferForm.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NFTTransferForm from '../NFTTransferForm';
import { ProvidersWrapper } from '@/test-utils';

describe('NFTTransferForm', () => {
  it('shows form inputs and lets you enter address', () => {
    render(<NFTTransferForm tokenId="1" />, {
      wrapper: ProvidersWrapper,
    });

    const input = screen.getByLabelText(/recipient address/i);
    fireEvent.change(input, {
      target: { value: '0x1234567890123456789012345678901234567890' },
    });

    expect(input).toHaveValue('0x1234567890123456789012345678901234567890');
  });

  it('shows error for invalid recipient address', async () => {
    render(<NFTTransferForm tokenId="1" />, {
      wrapper: ProvidersWrapper,
    });

    const input = screen.getByLabelText(/recipient address/i);
    fireEvent.change(input, { target: { value: 'invalid-address' } });

    const button = screen.getByRole('button', { name: /send nft/i });
    fireEvent.click(button);

    // ✅ Now matches element with role="alert"
    expect(await screen.findByRole('alert')).toHaveTextContent(
      /invalid recipient address format/i
    );
  });
});
