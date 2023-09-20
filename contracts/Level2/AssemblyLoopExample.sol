// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AssemblyLoopExample {
    function bad() external {
        uint256 gas = gasleft();
        // Inefficient approach: Plain calculation
        uint256 sum = 0;
        for(uint256 n = 0; n < 100; n++) {
            sum += n;
        }

        console.log("bad gas used", gas - gasleft());
    }

    function good() external {
        uint256 gas = gasleft();
        // Efficient approach: pure assembly, no overhead at all
        assembly {
            let sum := 0
            for {let n := 0} lt(n, 100) {n := add(n, 1)} {
                sum := add(sum, n)
            }
            mstore(0, sum)
        }
        console.log("good gas used", gas - gasleft());
    }
}
