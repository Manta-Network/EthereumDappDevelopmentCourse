import { ethers } from "hardhat";
import fs from "fs";
import { GameABI } from "../abi/abi";
import { AuctionHouse, Game } from "../typechain-types";

async function MintGameItem() {
  // 获取seaport abi，构建seaport合约对象

  const [GameAdmin, AuctionHouseAdmin, User_1] = await ethers.getSigners();

  const GameAddress = "0x25bEd169731c52372800feF328C1f924D3896eeb";
  const AuctionHouseAddress = "0xfb155E62e30A04A5304BA2d101960f1f950b68aa";

  const Game = (await ethers.getContractAt(GameABI, GameAddress)) as any as Game;
  const AuctionHouse = (await ethers.getContractAt(
    GameABI,
    AuctionHouseAddress
  )) as any as AuctionHouse;

  const tx = await Game.connect(GameAdmin).mint(User_1.address, BigInt("1"));
  console.log({ tx });
}

MintGameItem();
