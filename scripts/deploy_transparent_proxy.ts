// scripts/create-box.js

import { Signer } from "ethers";
import { ethers, upgrades } from "hardhat";

// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deplpyer address: ", await deployer.getAddress());
  const Transparent_Proxy_NFT = await ethers.getContractFactory(
    "Transparent_Proxy_NFT",
    deployer as any as Signer
  );
  console.log("Deploying Box...");
  const proxy = await upgrades.deployProxy(
    Transparent_Proxy_NFT as any,
    ["My NFT", "M"],
    { initializer: "initialize", verifySourceCode: true, kind: "transparent" }
  );
  console.log("proxy deployed to:", await proxy.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
