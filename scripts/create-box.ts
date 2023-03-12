// scripts/create-box.js

import { ethers, upgrades } from "hardhat";
// scripts/deploy.js
async function main() {
  const [deployer, deployer_2] = await ethers.getSigners();
  console.log("deplpyer address: ", deployer_2.address);
  const Box = await ethers.getContractFactory("Box", deployer_2);
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  console.log("Box deployed to:", box.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
