// src/constants.ts

// Allow importing in Vitest/Jest without real env-vars
const isTest = process.env.NODE_ENV === 'test';

const key = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
if (!key && !isTest) {
  throw new Error('Missing NEXT_PUBLIC_ALCHEMY_KEY in .env.local');
}

const contract = process.env.NEXT_PUBLIC_NFT_CONTRACT;
if (!contract && !isTest) {
  throw new Error('Missing NEXT_PUBLIC_NFT_CONTRACT in .env.local');
}

const chainIdEnv = process.env.NEXT_PUBLIC_CHAIN_ID;
if (!chainIdEnv && !isTest) {
  throw new Error('Missing NEXT_PUBLIC_CHAIN_ID in .env.local');
}

// In tests, values will be empty strings or 0 so nothing crashes
export const CHAIN_ID = isTest
  ? 0
  : Number(chainIdEnv!);

// In tests we stub these out; real app will hit Alchemy
export const ALCHEMY_BASE_URL = isTest
  ? ''
  : `https://base-sepolia.g.alchemy.com/nft/v2/${key!}`;

export const NFT_CONTRACT_ADDRESS = isTest
  ? ''
  : contract!;
