// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract UncheckedOverflow {
    function bad() external {
        uint256 gas = gasleft();
        // Inefficient approach: EVM will do overflow/underflow checking every operation
        uint data = 0;
        for (uint256 i; i < 2000; i++) {
            data += 1;
        }

        console.log("bad gas used", gas - gasleft());
    }

    function good() external {
        uint256 gas = gasleft();
        // Efficient approach: we can tell the compiler not to check for overflow or underflow in the operation
        uint data = 0;
        for (uint256 i; i < 2000; i++) {
            unchecked {
                data += 1;
            }
        }

        console.log("good gas used", gas - gasleft());
    }
}
