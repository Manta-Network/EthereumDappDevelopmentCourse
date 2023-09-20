// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract StorageExample {
    uint256 public data;

    function bad() external {
        uint256 gas = gasleft();
        // Inefficient approach: Directly update storage inside a loop
        for (uint256 i = 0; i < 20; i++) {
            data += 1;
        }
        console.log("bad gas used", gas - gasleft());
    }

    function good() external {
        uint256 gas = gasleft();
        // Efficient approach: Use a local variable and update storage once
        uint256 tempData = data;
        for (uint256 i = 0; i < 20; i++) {
            tempData += 1;
        }
        data = tempData;
        console.log("good gas used", gas - gasleft());
    }
}





