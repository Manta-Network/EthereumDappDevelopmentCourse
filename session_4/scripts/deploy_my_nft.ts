import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const nft = await ethers.deployContract("MyNFT");
  await nft.waitForDeployment();

  console.log(`my nft deployed at ${await nft.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});