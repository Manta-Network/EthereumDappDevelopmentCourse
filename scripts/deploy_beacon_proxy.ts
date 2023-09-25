// scripts/create-box.js

import { Signer } from "ethers";
import { ethers, upgrades } from "hardhat";

// scripts/deploy.js
async function main() {
  const [deployer, deployer_2] = await ethers.getSigners();
  console.log("deplpyer address: ", await deployer.getAddress());
  const Box = await ethers.getContractFactory("Box", deployer as any as Signer);
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [42], { initializer: "store" ,verifySourceCode:true,kind:"uups"});
  console.log("Box deployed to:", await box.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
