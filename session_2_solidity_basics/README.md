
# Solidity Auction House Tutorial

This repo contains the code for building an auction house smart contract system from scratch using Solidity and Hardhat. It is intended as a learning resource rather than production-ready code.

## Tutorial Overview

In this tutorial, we will:

* Set up a Hardhat development environment for compiling, testing, and deploying Solidity contracts
* Implement core auction house functionality like creating auctions, placing bids, ending auctions, and transferring NFTs
* Write tests to ensure proper operation of the contracts
* Deploy the contracts on mumbai network using Hardhat
* Interact with the deployed contracts from a basic frontend

## Usage

To follow along with the tutorial:

* Install dependencies: `npm install`
* Compile contracts: `npx hardhat compile`
* Run contract tests: `npx hardhat test`
* Deploy on mumbai: `npx hardhat run scripts/deploy.ts --network mumbai`

See the source code files and inline comments for explanations of the key concepts and steps.

## Disclaimer

This code is for educational purposes only and not audited for security. Do not use this on mainnet or with real funds.

## Resources

* [Hardhat Docs](https://hardhat.org/getting-started/)
* [Solidity Docs](https://docs.soliditylang.org/en/v0.8.11/)
