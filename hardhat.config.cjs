require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { PRIVATE_KEY } = process.env;
if (!PRIVATE_KEY) {
  throw new Error('🛑 Missing PRIVATE_KEY in .env');
}

module.exports = {
  solidity: '0.8.26',
  defaultNetwork: 'base-sepolia',
  networks: {
    'base-sepolia': {
      // Public Base Sepolia RPC—no key required
      url: 'https://sepolia.base.org',
      chainId: 84532,
      accounts: [PRIVATE_KEY],
    },
  },
};
