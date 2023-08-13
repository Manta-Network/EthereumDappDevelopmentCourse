import { expect } from "chai";
import { ethers } from "hardhat";

async function deployContracts() {
  const [gameAdmin, auctionHouseAdmin] = await ethers.getSigners();

  const { provider } = ethers;

  const GameFactory = await ethers.getContractFactory("Game", gameAdmin);
  const game = await GameFactory.deploy("Rolling", "RL");

  const AuctionHouseFactory = await ethers.getContractFactory(
    "AuctionHouse",
    auctionHouseAdmin
  );
  const auctionHouse = await AuctionHouseFactory.deploy();

  return { game, auctionHouse };
}


deployContracts()