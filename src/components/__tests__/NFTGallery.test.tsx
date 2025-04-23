import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // ✅ include fireEvent
import { describe, it, expect, vi } from 'vitest'; // ✅ include vi for mocking
import NFTGallery from '../NFTGallery';
import { ProvidersWrapper } from '@/test-utils';

describe('NFTGallery', () => {
  it('renders NFT list when passed', () => {
    const mockNfts = [
      { tokenId: '1', name: 'Mock NFT 1', image: '/1.png' },
      { tokenId: '2', name: 'Mock NFT 2', image: '/2.png' },
    ];

    render(<NFTGallery nfts={mockNfts} onSelect={() => {}} />, {
      wrapper: ProvidersWrapper,
    });

    expect(screen.getByText('Mock NFT 1')).toBeInTheDocument();
    expect(screen.getByText('Mock NFT 2')).toBeInTheDocument();
  });

  it('shows message when no NFTs found', () => {
    render(<NFTGallery nfts={[]} onSelect={() => {}} />, { wrapper: ProvidersWrapper });

    expect(screen.getByText(/no nfts found/i)).toBeInTheDocument();
  });

  it('calls onSelect when NFT is clicked', () => {
    const mockNfts = [{ tokenId: '1', name: 'Test NFT', image: '/1.png' }];
    const onSelect = vi.fn();

    render(<NFTGallery nfts={mockNfts} onSelect={onSelect} />, { wrapper: ProvidersWrapper });

    const nftCard = screen.getByText('Test NFT');
    fireEvent.click(nftCard);

    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
