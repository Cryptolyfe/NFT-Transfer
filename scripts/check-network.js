async function main() {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log('🔎 Current Base Sepolia block number:', blockNumber);
}
main().catch((e) => {
  console.error('❌ Network check failed:', e);
  process.exit(1);
});
