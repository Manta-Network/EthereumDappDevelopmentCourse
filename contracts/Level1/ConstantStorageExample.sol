// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ConstantStorageExample {
    uint256 public constant data1 = 100;
    uint256 public data2 = 100;

    function bad() external returns (uint256 data) {
        uint256 gas = gasleft();
        // Inefficient approach: reading from a non-constant storage
        data = data2;

        console.log("bad gas used", gas - gasleft());
    }

    function good() external returns (uint256 data) {
        uint256 gas = gasleft();
        // Efficient approach: reading from a constant storage, cuz it's not actually reading from the storage
        data = data1;
        
        console.log("good gas used", gas - gasleft());
    }
}

