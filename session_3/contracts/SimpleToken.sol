// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name = "Simple Token";
    string public symbol = "ST";

    uint256 public totalSupply;
    // e.g. 18, means to divide the token amount by 1e18 to get its user representation.
    // most of tokens' decimals is 18
    uint8 public decimals = 18;

    // mapping between user and balance
    mapping(address => uint256) public balances;
    // mapping user => spender => amount 
    mapping(address => mapping(address => uint256)) public allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        totalSupply = 1000000 * 10 ** uint256(decimals);
        balances[msg.sender] = totalSupply;
    }

    // transfer from msg.sender to receiver
    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balances[msg.sender] >= value, "ERC20: insufficient balance");

        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balances[from] >= value, "ERC20: insufficient balance");
        require(allowances[from][msg.sender] >= value, "ERC20: allowance exceeded");

        balances[from] -= value;
        balances[to] += value;
        allowances[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
}