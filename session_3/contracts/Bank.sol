// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Bank {
    using SafeERC20 for IERC20;
    IERC20 token;

    mapping(address => uint256) balances;

    constructor(IERC20 token_) {
        // Bank only support this token
        token = token_;
    }

    function deposit(uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);

        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "balance not enough");

        token.safeTransfer(msg.sender, amount);

        balances[msg.sender] -= amount;
    }

    function getUserBalanceAtBank(address user) external view returns(uint256) {
        return balances[user];
    }
}
