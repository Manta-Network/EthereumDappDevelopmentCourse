import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
  },

  networks: {
    mumbai: {
      chainId: 80001,
      url: process.env.MUMBAI_API,
      accounts: [
        process.env.GAME_ADMIN as string,
        process.env.AUCTION_HOUSE_ADMIN as string,
        process.env.USER_1 as string,
      ],
      gas: 100000,
    },
  },
};

export default config;
