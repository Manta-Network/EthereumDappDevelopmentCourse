//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Game.sol";

contract GameWithSpecialItems is Game {
    uint256 specialTokenAmount;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _specialTokenAmount
    ) Game(_name, _symbol) {
        specialTokenAmount = _specialTokenAmount;
    }

    function mint(address to, uint256 tokenId) public override {
        if (tokenId < specialTokenAmount) {
            revert("Special Token can't be minted by admin");
        }

        super.mint(to, tokenId);
    }
}
