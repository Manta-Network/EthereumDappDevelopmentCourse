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
// metadata
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)

// query
function balanceOf(address _owner) public view returns (uint256 balance)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

// actions
function transfer(address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

## Examples

### SimpleToken
see contracts/SimpleToken.sol

### USDT using OpenZeppelin
see contracts/USDT.sol

publish & verify contracts on explorer:
- ```npx hardhat flatten contracts/Bank.sol > temp.sol```
- remove duplicated LICENSE line.
- verify

### Using ERC20 in other contracts
see contracts/Bank.sol

full flow:
- user approve bank contract to spend his USDT
- user deposit
  - user -> ```deposit``` in bank contract -> ```transferFrom``` in usdt contract
- user withdraw