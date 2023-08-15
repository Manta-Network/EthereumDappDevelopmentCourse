import { ethers } from "hardhat";

export async function main() {
  const [gameAdmin, auctionHouseAdmin, user_1,user_2] = await ethers.getSigners();

  console.log(gameAdmin.address)
  console.log(auctionHouseAdmin.address)
  console.log(user_1.address)
  console.log(user_2.address)
  process.exit()

  const balanceOfGameAdmin = await ethers.provider.getBalance(gameAdmin.address);
  const balanceOfAuctionHouse = await ethers.provider.getBalance(auctionHouseAdmin.address);
  console.log(
    `game admin: ${gameAdmin.address}, balance: ${balanceOfGameAdmin}\nauction house admin: ${auctionHouseAdmin.address}, balance: ${balanceOfAuctionHouse}`
  );

  const GameFactory = await ethers.getContractFactory("Game", gameAdmin);
  const Game = await GameFactory.deploy("Rock Paper Sicssors", "RPS");

  console.log(`The Game address is : ${await Game.getAddress()}`);

  const AuctionHouseFactory = await ethers.getContractFactory("AuctionHouse", auctionHouseAdmin);
  const AuctionHouse = await AuctionHouseFactory.deploy();

  console.log(`The AuctionHouse address is : ${await AuctionHouse.getAddress()}`);

  return { Game, AuctionHouse };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
});
