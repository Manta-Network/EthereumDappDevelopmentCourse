# ERC20
ERC20 stands for "Ethereum Request for Comment 20," and it is a widely adopted standard for fungible tokens on the Ethereum blockchain.

## Key Features of ERC20

- Fungibility

Tokens are interchangeable on a one-to-one basis, meaning one token is always equal to another of the same type, promoting interchangeability and value transfer.

- Decimals

ERC20 tokens can be divided into fractional units, allowing for fine-grained transactions and pricing.

- Approval Mechanism

Users can grant approval to a specific address to spend a defined amount of tokens on their behalf, facilitating token transfers by third parties like exchanges.

## Standardized Interfaces

If a Smart Contract implements the following methods and events it can be called an ERC-20 Token Contract and, once deployed, it will be responsible to keep track of the created tokens on Ethereum.

```
solidity
// Returns the name of the token - e.g. "MyToken"
function name() public view returns (string)

// Returns the symbol of the token. E.g. “HIX”.
function symbol() public view returns (string)

/*
Returns the number of decimals the token uses - e.g. 8, means to divide the token amount by 100000000 to get its user representation.
*/
function decimals() public view returns (uint8)

// Returns the total token supply.
function totalSupply() public view returns (uint256)

// Returns the account balance
function balanceOf(address _owner) public view returns (uint256 balance)

/* 
Returns the amount which _spender is still allowed to withdraw from _owner.
*/
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

/* 
Transfers _value amount of tokens to address _to, and MUST fire the Transfer event. The function SHOULD throw if the message caller’s account balance does not have enough tokens to spend.
*/
function transfer(address _to, uint256 _value) public returns (bool success)

/*
Transfers _value amount of tokens from address _from to address _to, and MUST fire the Transfer event.

The transferFrom method is used for a withdraw workflow, allowing contracts to transfer tokens on your behalf. This can be used for example to allow a contract to transfer tokens on your behalf and/or to charge fees in sub-currencies. The function SHOULD throw unless the _from account has deliberately authorized the sender of the message via some mechanism.
*/
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)

/*
Allows _spender to withdraw from your account multiple times, up to the _value amount. If this function is called again it overwrites the current allowance with _value.
*/
function approve(address _spender, uint256 _value) public returns (bool success)

/*
MUST trigger when tokens are transferred, including zero value transfers.

A token contract which creates new tokens SHOULD trigger a Transfer event with the _from address set to 0x0 when tokens are created.
*/
event Transfer(address indexed _from, address indexed _to, uint256 _value)

/* MUST trigger on any successful call to approve(address _spender, uint256 _value).
*/
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

## Examples

### SimpleToken
[SimpleToken](https://github.com/Manta-Network/EthereumDappDevelopmentCourse/blob/session-3/session_3/contracts/SimpleToken.sol)

### USDT using OpenZeppelin
[USDT](https://github.com/Manta-Network/EthereumDappDevelopmentCourse/blob/session-3/session_3/contracts/USDT.sol)

publish & verify contracts on explorer:
- ```npx hardhat flatten contracts/Bank.sol > temp.sol```
- remove duplicated LICENSE line.
- verify

### Using ERC20 in other contracts
[Bank](https://github.com/Manta-Network/EthereumDappDevelopmentCourse/blob/session-3/session_3/contracts/Bank.sol)

full flow of bank logic:
- user approve bank contract to spend his USDT
- user deposit
  - user -> ```deposit``` in bank contract -> ```transferFrom``` in usdt contract
- user withdraw