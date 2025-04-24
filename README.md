# NFT-Transfer Mini-App

A lightweight Next.js demo for browsing and transferring NFTs using Wagmi & Viem, complete with unit tests and CI.

---

## ✨ Features

- **Connect Wallet**  
  Easily connect/disconnect via Metamask, WalletConnect, etc.

- **NFT Gallery**  
  Fetches your NFTs from Alchemy and displays them in a responsive grid.

- **Transfer Form**  
  Validates recipient addresses and calls `safeTransferFrom` on your ERC-721 contract.

- **Robust Testing**  
  ✅ Validation, happy & failure paths covered with Vitest + Testing-Library  
  ✅ Global Wagmi mocks for deterministic tests

- **Continuous Integration**  
  GitHub Actions runs **lint**, **type-check**, **build**, and **tests** on every PR.

---

## 📦 Getting Started

1. Clone and install:

   ```bash
   git clone git@github.com:Cryptolyfe/NFT-Transfer.git
   cd NFT-Transfer
   npm install
## 🧪 Test Suite & Coverage

We’ve written comprehensive unit tests to verify every core behavior:

| File                                  | Specs                                                                                     | Coverage  |
|---------------------------------------|-------------------------------------------------------------------------------------------|-----------|
| `useNfts.test.tsx`                    | • ✅ Fetch success<br>• ✅ API error<br>• ✅ Empty list                                     | 100 %     |
| `NFTGallery.test.tsx`                 | • ✅ Renders list of NFTs<br>• ✅ Empty state<br>• ✅ onSelect callback                    | 100 %     |
| `ConnectWallet.test.tsx`              | • ✅ “Connect Wallet” when disconnected<br>• ✅ “Disconnect” when connected                 | 100 %     |
| `NFTTransferForm.test.tsx`            | • ✅ Invalid-address validation<br>• ✅ Successful `writeContractAsync` call<br>• ✅ Wagmi error path<br>• ✅ Blank-input no-op | 95 %+     |

All files          | 76.9% statements | 64.1% branches | 68.8% functions | 76.9% lines
src/components     | 94.7% statements | 73.1% branches | 75.0% functions | 94.7% lines
src/hooks          | 67.6% statements | 42.9% branches |100.0% functions | 67.6% lines
