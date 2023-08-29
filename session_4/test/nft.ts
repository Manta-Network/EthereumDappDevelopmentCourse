import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyNFT, MyNFTReceiver } from '../typechain-types';

describe("nft tests", function () {
  let signers: SignerWithAddress[];
  let user: SignerWithAddress;
  let nftContract: MyNFT;
  let receiverContract: MyNFTReceiver;

  beforeEach(async function () {
    signers = await ethers.getSigners();
    user = signers[0];

    nftContract = await ethers.deployContract("MyNFT");
    await nftContract.waitForDeployment();

    receiverContract = await ethers.deployContract("MyNFTReceiver");
    await receiverContract.waitForDeployment();
  });

  describe("receiver test", function () {
    beforeEach(async function () {});

    it("success when receiver is receiverContract", async function () {
      await nftContract.connect(user).mint();
      console.log("user mint an NFT");

      await nftContract.connect(user).safeTransferFrom(user.address, await receiverContract.getAddress(), 1);
      console.log("user transfer token to receiver contract");
    });
  });
});
