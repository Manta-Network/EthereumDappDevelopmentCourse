// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyNFT is ERC721Enumerable {
    uint256 public tokenIdCounter;
    
    constructor() ERC721("MyNFT", "NFT") {
        tokenIdCounter = 1;
    }

    function mint() external {
        _mint(msg.sender, tokenIdCounter);
        tokenIdCounter++;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.com/token/";
    }

    function tokenURI(uint256 tokenId) public pure override returns (string memory) {
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId)));
    }
}
