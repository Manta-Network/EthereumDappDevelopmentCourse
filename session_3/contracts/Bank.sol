// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// SafeERC20 is a utility library provided by OpenZeppelin that enhances the safety of interacting with ERC20 tokens.
// It offers a set of functions that wrap the standard ERC20 methods to prevent common pitfalls and vulnerabilities in token transfers.
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// user can deposit usdt into the bank, and withdraw from the bank
contract Bank {
    using SafeERC20 for IERC20;
    IERC20 token;

    mapping(address => uint256) balances;

    constructor(IERC20 token_) {
        // Bank only support this token
        token = token_;
    }

    // user->bank:deposit->usdt:transferFrom
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
