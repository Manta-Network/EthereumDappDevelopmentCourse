import { ethers } from "hardhat";

const usdtContractAddress = "0xdDE214E2823Bf019375FaDF6d8cc933c9053c11b";

async function main() {
  const [deployer] = await ethers.getSigners();

  const bank = await ethers.deployContract("Bank", [usdtContractAddress]);
  await bank.waitForDeployment();

  console.log(`Bank deployed at ${await bank.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
