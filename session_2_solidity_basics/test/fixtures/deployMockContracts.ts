import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers } from "hardhat";

export async function deployMockContracts(
  gameAdmin: HardhatEthersSigner,
  auctionHouseAdmin: HardhatEthersSigner
) {
  const GameFactory = await ethers.getContractFactory("Game", gameAdmin);
  const Game = await GameFactory.deploy("Rock Paper Sicssors", "RPS");

  const AuctionHouseFactory = await ethers.getContractFactory("AuctionHouse", auctionHouseAdmin);
  const AuctionHouse = await AuctionHouseFactory.deploy();

  return { Game, AuctionHouse };
}
