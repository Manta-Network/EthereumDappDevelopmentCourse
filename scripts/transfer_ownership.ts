// scripts/transfer_ownership.js
import { ethers, upgrades } from "hardhat";

async function main() {
  const newAdmin = "0x1c14600daeca8852BA559CC8EdB1C383B8825906";

  console.log("Transferring ownership of ProxyAdmin...");
  // The owner of the ProxyAdmin can upgrade our contracts
  await upgrades.admin.transferProxyAdminOwnership(newAdmin);
  console.log("Transferred ownership of ProxyAdmin to:", newAdmin);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
