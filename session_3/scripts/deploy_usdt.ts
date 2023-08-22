import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const usdt = await ethers.deployContract("USDT");
  await usdt.waitForDeployment();

  console.log(`usdt deployed at ${await usdt.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
