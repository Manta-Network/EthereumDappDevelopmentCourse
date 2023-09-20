// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogExample {
    uint256 public data;

    function incrementDataBad() external {
        // Inefficient approach: Directly update storage inside a loop
        for (uint256 i = 0; i < 20; i++) {
            data += 1;
        }
    }

    function incrementDataGood() external {
        // Efficient approach: Use a local variable and update storage once
        uint256 tempData = data;
        for (uint256 i = 0; i < 20; i++) {
            tempData += 1;
        }
        data = tempData;
    }
}





