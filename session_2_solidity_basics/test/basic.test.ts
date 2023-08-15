import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { AuctionHouse, Game } from "../typechain-types";
import { deployMockContracts } from "./fixtures/deployMockContracts";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { BigNumberish, ContractTransactionReceipt } from "ethers";
import { mine } from "@nomicfoundation/hardhat-network-helpers";

describe("Test Game and Auction House", function () {
  let AuctionHouseAdmin: HardhatEthersSigner;
  let GameAdmin: HardhatEthersSigner;
  let Seller_1: HardhatEthersSigner;
  let Seller_2: HardhatEthersSigner;
  let Bidder_1: HardhatEthersSigner;
  let Bidder_2: HardhatEthersSigner;
  let AuctionHouse: AuctionHouse;
  let Game: Game;

  before(async () => {
    [GameAdmin, AuctionHouseAdmin, Seller_1, Seller_2, Bidder_1, Bidder_2] =
      await ethers.getSigners();

    // deploy contract
    ({ AuctionHouse, Game } = await deployMockContracts(GameAdmin, AuctionHouseAdmin));
  });

  // test admins have been correctly set by the deployer of contracts
  describe("Check Admin", async function () {
    it("Admin of AuctionHouse", async function () {
      const admin = await AuctionHouse.admin();

      await expect(admin).to.equal(AuctionHouseAdmin.address);
    });

    it("Admin of Game", async function () {
      const admin = await Game.admin();
      await expect(admin).to.equal(GameAdmin.address);
    });

    it("Only Admin of AuctionHouse can pause Auction House", async function () {
      const transaction = AuctionHouse.connect(Seller_1).pauseAuctionHouse(true);
      await expect(transaction).to.be.revertedWith("ONLY ADMIN");
    });
  });

  describe("Mint game item", async function () {
    const tokenId = BigInt("1");
    before(async () => {
      // mint a game item to Seller
      await Game.connect(GameAdmin).mint(Seller_1.address, tokenId);
    });

    it("check ownership", async function () {
      const owner = await Game.ownerOf(tokenId);
      await expect(owner).to.equal(Seller_1.address);
    });

    it("check token balance", async function () {
      const balance = await Game.balanceOf(Seller_1.address);
      await expect(balance).to.equal(1);
    });
  });

  describe("Transfer game item", async function () {
    const tokenId = BigInt("2");
    before(async () => {
      // mint a game item to Seller
      await Game.connect(GameAdmin).mint(Seller_1.address, tokenId);
    });

    it("Only owner can transfer game item", async function () {
      // transfer game item from seller_1 to seller_2 by seller_1
      const transaction = Game.connect(Seller_2).transferFrom(
        Seller_1.address,
        Seller_2.address,
        tokenId
      );
      await expect(transaction).to.be.revertedWith(
        "caller is not the token owner or approved account"
      );
    });

    it("transfer game item, balance and owner get updated", async function () {
      // transfer game item from seller_1 to seller_2
      await Game.connect(Seller_1).transferFrom(Seller_1.address, Seller_2.address, tokenId);

      const balanceOfSeller1 = await Game.balanceOf(Seller_1.address);
      const balanceOfSeller2 = await Game.balanceOf(Seller_2.address);
      const owner = await Game.ownerOf(tokenId);

      await expect(balanceOfSeller1).to.equal(BigInt("1"));
      await expect(balanceOfSeller2).to.equal(BigInt("1"));
      await expect(owner).to.equal(Seller_2.address);
    });
  });

  describe("auction", async () => {
    describe("fail to execute auction", async () => {
      let auctionName: string;
      let starPrice: BigNumberish;
      let startBlock: BigNumberish;
      let endBlock: BigNumberish;
      let token: string;
      let tokenId: BigNumberish;
      let auctionId: BigNumberish;

      before(async () => {
        auctionName = "Alice's game item";
        starPrice = ethers.parseEther("1");
        startBlock = BigInt(20);
        endBlock = BigInt(30);
        token = await Game.getAddress();
        tokenId = BigInt("3");

        // mint a game item to Seller
        await Game.connect(GameAdmin).mint(Seller_1.address, tokenId);
        await AuctionHouse.connect(Seller_1).createAuction(
          auctionName,
          starPrice,
          startBlock,
          endBlock,
          token,
          tokenId
        );

        auctionId = (await AuctionHouse.nextAuctionId()) - BigInt(1);
      });

      it("create an auction", async () => {
        const auction = await AuctionHouse.auctions(auctionId);
        const token = await Game.getAddress();

        await expect(auction).to.eql([
          auctionName,
          Seller_1.address,
          starPrice,
          startBlock,
          endBlock,
          ethers.ZeroAddress,
          BigInt(0),
          token,
          tokenId,
        ]);
      });

      it("fail bid: block height smaller than block start", async () => {
        const lastedBlock = (await ethers.provider.getBlock("latest"))?.number;

        if (!lastedBlock || BigInt(lastedBlock) >= BigInt(startBlock)) {
          throw "incorrect lastest block's height";
        }

        const bidPrice = "1.1";
        const transaction = AuctionHouse.connect(Bidder_1).bid(auctionId, {
          value: ethers.parseEther(bidPrice),
        });

        await expect(transaction).to.be.rejectedWith("invalid time:1");
      });

      it("fail bid: block height bigger than block end", async () => {
        await mine(35);

        const lastedBlock = (await ethers.provider.getBlock("latest"))?.number;

        if (!lastedBlock || BigInt(lastedBlock) <= BigInt(startBlock)) {
          throw "incorrect lastest block's height";
        }

        const bidPrice = "1.1";
        const transaction = AuctionHouse.connect(Bidder_1).bid(auctionId, {
          value: ethers.parseEther(bidPrice),
        });

        await expect(transaction).to.be.rejectedWith("invalid time:2");
      });
    });

    describe("succeed to execute auction", async () => {
      let auctionName: string;
      let starPrice: BigNumberish;
      let startBlock: BigNumberish;
      let endBlock: BigNumberish;
      let token: string;
      let tokenId: BigNumberish;
      let auctionId: BigNumberish;

      before(async () => {
        auctionName = "Alice's game item";
        starPrice = ethers.parseEther("1");
        startBlock = BigInt(100);
        endBlock = BigInt(200);
        token = await Game.getAddress();
        tokenId = BigInt("4");

        // mint a game item to Seller
        await Game.connect(GameAdmin).mint(Seller_1.address, tokenId);
        await AuctionHouse.connect(Seller_1).createAuction(
          auctionName,
          starPrice,
          startBlock,
          endBlock,
          token,
          tokenId
        );

        auctionId = (await AuctionHouse.nextAuctionId()) - BigInt(1);
      });

      it("Sell to the highest bidder", async () => {
        var lastedBlock = (await ethers.provider.getBlock("latest"))?.number;
        if (!lastedBlock || BigInt(lastedBlock) >= BigInt(startBlock)) {
          throw "incorrect lastest block's height";
        }

        const bidder_1_bid_price = ethers.parseEther("2");
        const bidder_2_bid_price = ethers.parseEther("3");

        await mine(BigInt(startBlock) - BigInt(lastedBlock));

        await Game.connect(Seller_1).approve(await AuctionHouse.getAddress(), tokenId);

        await AuctionHouse.connect(Bidder_1).bid(auctionId, { value: bidder_1_bid_price });
        await AuctionHouse.connect(Bidder_2).bid(auctionId, { value: bidder_2_bid_price });

        const [
          _name,
          _seller,
          _startPrice,
          _startBlock,
          _endBlock,
          _highestBidder,
          _highestBid,
          _token,
          _identifier,
        ] = await AuctionHouse.auctions(auctionId);

        await expect(_highestBidder).to.equal(Bidder_2.address);
        await expect(_highestBid).to.equal(bidder_2_bid_price);

        await expect(await AuctionHouse.pendingReturns(Bidder_1.address)).to.equal(
          bidder_1_bid_price
        );

        var lastedBlock = (await ethers.provider.getBlock("latest"))?.number;
        if (!lastedBlock) {
          throw "incorrect lastest block's height";
        }

        if (BigInt(endBlock) > lastedBlock) {
          await mine(BigInt(endBlock) - BigInt(lastedBlock) + BigInt(1));
        }

        const originalBalance = await ethers.provider.getBalance(Seller_1.address);

        // check seller's balance
        const transaction = await AuctionHouse.connect(Seller_1).auctionEnd([auctionId]);
        const receipt = (await transaction.wait()) as ContractTransactionReceipt;

        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // check game item ownership
        await expect(await Game.ownerOf(tokenId)).to.equal(Bidder_2.address);

        await expect(await ethers.provider.getBalance(Seller_1.address)).to.equal(
          originalBalance - gasUsed + bidder_2_bid_price
        );
      });
    });
  });
});
