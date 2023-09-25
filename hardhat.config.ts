import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.17" }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    hardhat: { allowUnlimitedContractSize: true },
    mumbai: {
      chainId: 80001,
      url: process.env.ALCHEMY_API,
      accounts: [
        process.env.DEPLOYER as string,
      ],
      gas: 10000000,
    },
    
  },
  etherscan:{
    apiKey:process.env.mumbaiApiKey
  }
};
export default config;
