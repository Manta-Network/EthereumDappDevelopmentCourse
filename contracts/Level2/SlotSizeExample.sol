// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SlotSizeGoodExample {
    uint256 public data;

    function set() external {
        uint256 gas = gasleft();

        // Efficient approach: just be straightforward
        data = 100;
        console.log("good gas used", gas - gasleft());

    }
}

contract SlotSizeBadExample {
    uint8 public data;

    function set() external {
        uint256 gas = gasleft();

        // Inefficient approach: Be smart trying to use `uint8` to reduce storage  
        data = 100;
        console.log("bad gas used", gas - gasleft());

    }
}





