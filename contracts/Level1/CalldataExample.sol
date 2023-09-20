// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CalldataExample {
    uint256 public constant data1 = 100;
    uint256 public data2 = 100;

    function bad(uint256[] memory data) external {
        uint256 gas = gasleft();
        // Inefficient approach: iterate through memory data
        for (uint256 i = 0; i < data.length; ++i) {
        }

        console.log("bad gas used", gas - gasleft());
    }

    function good(uint256[] calldata data) external {
        uint256 gas = gasleft();
        // Efficient approach: iterate through calldata data
        for (uint256 i = 0; i < data.length; ++i) {
        }
        
        console.log("good gas used", gas - gasleft());
    }
}

