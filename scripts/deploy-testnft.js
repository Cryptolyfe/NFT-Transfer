async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('🪙 Deploying from:', deployer.address);

  const TestNFT = await ethers.getContractFactory('TestNFT');
  const nft = await TestNFT.deploy({
    gasPrice: ethers.utils.parseUnits('30', 'gwei'),
    gasLimit: 3_000_000,
  });

  console.log('🔸 New Transaction hash:', nft.deployTransaction.hash);
  console.log('✅ Deployed at address (pending):', nft.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
