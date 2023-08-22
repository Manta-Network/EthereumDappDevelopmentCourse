import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const simpleToken = await ethers.deployContract("SimpleToken");
  await simpleToken.waitForDeployment();

  console.log(`usdt deployed at ${await simpleToken.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
