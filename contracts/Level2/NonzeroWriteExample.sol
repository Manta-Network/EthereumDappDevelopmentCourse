// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract NonzeroWriteExample {
    uint256 data1;
    uint256 data2 = 1;

    function bad() external returns (uint256 data) {
        uint256 gas = gasleft();
        // Inefficient approach: write to a zero value storage
        data1 = 10;

        console.log("bad gas used", gas - gasleft());
    }

    function good() external returns (uint256 data) {
        uint256 gas = gasleft();
        // Efficient approach: write to a non-zero value storage
        data2 = 10;
        
        console.log("good gas used", gas - gasleft());
    }
}

