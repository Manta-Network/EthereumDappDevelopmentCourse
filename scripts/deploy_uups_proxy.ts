// scripts/create-box.js

import { Signer } from "ethers";
import { ethers, upgrades } from "hardhat";

// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deplpyer address: ", await deployer.getAddress());
  const UUPS_Proxy_NFT = await ethers.getContractFactory(
    "UUPS_Proxy_NFT",
    deployer as any as Signer
  );
  console.log("Deploying UUPS_Proxy_NFT...");
  const proxy = await upgrades.deployProxy(
    UUPS_Proxy_NFT as any,
    ["My NFT", "M"],
    { initializer: "initialize", verifySourceCode: true, kind: "uups" }
  );
  console.log("proxy deployed to:", await proxy.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
