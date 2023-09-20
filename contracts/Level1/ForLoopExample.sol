// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ForLoopExample {
    function bad() external returns (uint256 data) {
        uint256 gas = gasleft();
        // Inefficient approach: i++ will create a new temporary variable to do the incrementation
        for (uint256 i; i < 2000; i++) {}

        console.log("bad gas used", gas - gasleft());
    }

    function good() external returns (uint256 data) {
        uint256 gas = gasleft();
        // Efficient approach: ++i will just increment the i and be good
        for (uint256 i; i < 2000; ++i) {}
        
        console.log("good gas used", gas - gasleft());
    }
}

