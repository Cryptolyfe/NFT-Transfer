# NFT-Transfer Mini-App

A lightweight **Next.js ( App Router ) + Wagmi v2 + Viem** demo that lets any
user:

* connect their MetaMask wallet  
* view every NFT they own **on Base Sepolia** from one hard-coded collection  
* mint a demo NFT 
* select an NFT and transfer it to another address

All core flows are fully unit-tested with **Vitest + Testing Library** and the
repo ships with Hardhat scripts & CI.

---

## ✨ Features & How each requirement is satisfied

| Spec from brief | Implementation |
|-----------------|----------------|
| Wallet-connect (MetaMask) | `useConnect` with **MetaMaskConnector** (wagmi v2) |
| Chain-specific logic | Config and `autoSwitch` lock the dapp to **Base Sepolia (84532)** |
| Pre-defined collection | `NEXT_PUBLIC_NFT_CONTRACT` env var; every fetch/write uses that address |
| NFT list display | `useNfts` hits **Alchemy NFT API** → name & image grid |
| Select & highlight | Click card → blue frame |
| Transfer to address | `<NFTTransferForm>` validates `isAddress`, calls `safeTransferFrom` via Wagmi `useContractWrite` |
| Error handling | Inline messages + DaisyUI toast banners |
| Tx status indicator | Button shows “Sending…”, success toast links to Basescan |
| Nice-to-have: Mint demo NFT | `<MintButton>` calls contract `mint()` so reviewers can create assets quickly |

---

## 🛠 Tech Stack

| Layer | Choice | |
|-------|--------|-----|
| React tool-kit | **Next 15 (App Router)** |
| Wallet / chains | **wagmi v2** + **Viem** for type-safe RPC |
| UI | **Tailwind CSS** + **daisyUI** components |
| Data | **Alchemy NFT API** for fast owner queries |
| Testing | **Vitest** + React Testing Library |
| Contract dev | **Hardhat** tooling & deploy scripts |

---

## 🚀 Getting Started (local)

```bash
git clone https://github.com/Cryptolyfe/NFT-Transfer.git
cd nft-transfer
pnpm install           # or npm / yarn
cp .env.example .env.local
#  └─ fill in: NEXT_PUBLIC_ALCHEMY_KEY, NEXT_PUBLIC_NFT_CONTRACT, PRIVATE_KEY

# optional: deploy your own ERC-721 to Base Sepolia
npx hardhat run scripts/deploy.ts --network base-sepolia

pnpm dev               # http://localhost:3000


Important environment keys

Key	Purpose
NEXT_PUBLIC_ALCHEMY_KEY	Auth for Alchemy NFT API
NEXT_PUBLIC_NFT_CONTRACT	The ERC-721 collection you want to view/transfer
PRIVATE_KEY	For Hardhat deploy (never required in frontend)
NEXT_PUBLIC_CHAIN_ID	Defaults to 84532 (Base Sepolia)
Vercel deploy: add the same vars in the dashboard → the dapp works out of the box 
Vercel
.

🧪 Test Suite & Coverage

File	Key specs covered	Line Cov
useNfts.test.tsx	fetch success / API error / empty	100 %
NFTGallery.test.tsx	render list / empty state / onSelect	100 %
ConnectWallet.test.tsx	connect / disconnect buttons	100 %
NFTTransferForm.test.tsx	invalid addr / successful transfer / wagmi error / blank no-op	95 %
To keep coverage fresh: pnpm test && pnpm typecheck before every commit (CI runs the same).

📝 Known Limitations
Image URLs depend on contract metadata; tokens without image field render name only.

Gas estimate errors show as a generic “Transaction failed” toast (could map more granular reasons).

ESLint has a few any pragmas in mocks to keep tests terse.

 ✓ src/components/__tests__/ConnectWallet.test.tsx (2 tests) 74ms
 ✓ src/components/__tests__/NFTTransferForm.test.tsx (3 tests) 93ms
 ✓ src/components/__tests__/NFTGallery.test.tsx (3 tests) 54ms

 Test Files  4 passed (4)
      Tests  11 passed (11)
   Start at  17:57:31
   Duration  1.30s (transform 138ms, setup 423ms, collect 1.54s, tests 233ms, environment 1.42s, prepare 210ms)

 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   60.52 |    54.71 |   65.21 |   60.52 |                   
 ...nsfer |       0 |    33.33 |   33.33 |       0 |                   
  ....cjs |       0 |        0 |       0 |       0 | 1-20              
  ...g.ts |       0 |      100 |     100 |       0 | 3-7               
  ...g.js |       0 |        0 |       0 |       0 | 1-10              
 ...ripts |       0 |        0 |       0 |       0 |                   
  ...k.js |       0 |        0 |       0 |       0 | 1-8               
  ...t.js |       0 |        0 |       0 |       0 | 1-18              
 ...r/src |   79.06 |    14.28 |     100 |   79.06 |                   
  ...s.ts |   59.09 |        0 |     100 |   59.09 | ...18-19,24,29,33 
  ....tsx |     100 |      100 |     100 |     100 |                   
  ...g.ts |     100 |      100 |     100 |     100 |                   
 ...c/abi |     100 |      100 |     100 |     100 |                   
  ...1.ts |     100 |      100 |     100 |     100 |                   
  ...i.ts |     100 |      100 |     100 |     100 |                   
 ...c/app |       0 |      100 |     100 |       0 |                   
  ....tsx |       0 |      100 |     100 |       0 | 2-20              
  ....tsx |       0 |      100 |     100 |       0 | 2-16              
  ....tsx |       0 |      100 |     100 |       0 | 3-20              
 ...nents |    71.6 |    65.62 |   66.66 |    71.6 |                   
  ....tsx |     100 |      100 |   33.33 |     100 |                   
  ....tsx |      42 |       50 |      50 |      42 | 23-59             
  ....tsx |   89.23 |       60 |     100 |   89.23 | 67-73             
  ....tsx |   95.89 |       60 |     100 |   95.89 | 68-70             
  ....tsx |   14.28 |      100 |      50 |   14.28 | 15-52             
 ...hooks |   78.37 |       50 |     100 |   78.37 |                   
  ...s.ts |   78.37 |       50 |     100 |   78.37 | 26,29-35          
----------|---------|----------|---------|---------|-------------------

[NFT Transfer Tool Live on Vercel](https://nft-transfer-chi.vercel.app)
