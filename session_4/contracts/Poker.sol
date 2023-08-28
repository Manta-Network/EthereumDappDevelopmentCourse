// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Poker is ERC721, Ownable {
    uint256 private tokenIdCounter = 0;

    constructor() ERC721("PokerCards", "PKR") {}

    function mint(address to) external onlyOwner {
        require(to != address(0), "Invalid address");
        uint256 tokenId = tokenIdCounter;
        _mint(to, tokenId);
        tokenIdCounter++;
    }
}





