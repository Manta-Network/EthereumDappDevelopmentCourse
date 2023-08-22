import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Bank, USDT } from "../typechain-types";

describe("erc20 tests", function () {
  let signers: SignerWithAddress[];
  let user: SignerWithAddress;
  let usdtContract: USDT;
  let bankContract: Bank;

  beforeEach(async function () {
    signers = await ethers.getSigners();
    user = signers[0];

    usdtContract = await ethers.deployContract("USDT");
    await usdtContract.waitForDeployment();

    bankContract = await ethers.deployContract("Bank", [usdtContract.getAddress()]);
    await bankContract.waitForDeployment();
  });

  describe("bank test", function () {
    beforeEach(async function () {});

    it("deposit", async function () {
      await usdtContract.connect(user).approve(bankContract.getAddress(), 100);
      console.log("user approved the bank");

      await bankContract.connect(user).deposit(20);
      console.log("user deposit 20 into bank");

      await bankContract.connect(user).withdraw(10);
      console.log("user withdraw 10 from bank");

      console.log(`user balance at bank is ${await bankContract.getUserBalanceAtBank(user.address)}`)
    });
  });
});
