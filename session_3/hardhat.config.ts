import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-ethers';
import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-gas-reporter";
import "@typechain/hardhat";

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
    manta: {
      accounts: [process.env.PRIVATE_KEY as string],
      url: "https://manta-testnet.calderachain.xyz/http"
    }
  },
};

export default config;