# ERC721

## What is NFT/ERC721

- NFT: A Non-Fungible Token (NFT) is used to identify something or someone in a unique way. This type of Token is perfect to be used on platforms that offer collectible items, access keys, lottery tickets, numbered seats for concerts and sports matches, etc. This special type of Token has amazing possibilities so it deserves a proper Standard, the ERC-721 came to solve that!

- ERC721: The ERC-721 introduces a standard for NFT, in other words, this type of Token is unique and can have different value than another Token from the same Smart Contract. All NFTs have a uint256 variable called ```tokenId```, so for any ERC-721 Contract, ```tokenId``` must be globally unique. That said, a dapp can have a "converter" that uses the tokenId as input and outputs an image of something cool!

## Key Features of ERC721

- Non-Fungibility

Unlike ERC20 tokens, each ERC721 token is unique and cannot be exchanged on a one-to-one basis with another token. This uniqueness makes ERC721 tokens suitable for representing individual items, collectibles, or unique assets.

- Token ID

Tokens are identified by a unique token ID, which is a non-negative integer. Each token in a contract has a distinct token ID associated with it.

- Approval Mechanism

Token owners can grant approval to another address to transfer their tokens on their behalf.

## Standardized Interfaces

If a Smart Contract implements the following methods and events it can be called an ERC-721 Token Contract and, once deployed, it will be responsible to keep track of the created tokens on Ethereum.

```
solidity
/*
Approve actions
*/

/*
Grants approval for a specific token ID to a designated address. The approved address is allowed to execute the transferFrom operation in the future.
*/
function approve(address _approved, uint256 _tokenId) external payable;

/*
Approves or revokes an operator's ability to perform token transfers on behalf of the owner.
*/
function setApprovalForAll(address _operator, bool _approved) external;

/*
Retrieves the address approved to execute the transferFrom operation for a specific token ID.
*/
function getApproved(uint256 _tokenId) external view returns (address);

/*
Checks whether an operator address is approved to perform all token transfers on behalf of a specific owner.
*/
function isApprovedForAll(address _owner, address _operator) external view returns (bool);


/*
Transfer actions
*/

/*
Transfers a token from one address to another. Only an address with approval can perform this operation.
*/
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

/*
Safely transfers a token from one address to another. Fails if the receiving address is a contract that does not support receiving tokens.
*/
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

/*
Similar to the above ```safeTransferFrom```, but allows additional data to be included.
*/
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;


/*
Query actions
*/

// Retrieves the count of tokens owned by a specific address.
function balanceOf(address _owner) external view returns (uint256);

// Retrieves the owner's address for a specific token ID.
function ownerOf(uint256 _tokenId) external view returns (address);

// This emits when ownership of any NFT changes by any mechanism.
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

// This emits when the approved address for an NFT is changed orreaffirmed.
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

// This emits when an operator is enabled or disabled for an owner.
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

## Write a ERC721 contract

### SimpleERC721Token
[SimpleERC721Token](https://github.com/Manta-Network/EthereumDappDevelopmentCourse/blob/session-4/session_4/contracts/SimpleERC721Token.sol)

### MyNFT
[MyNFT](https://github.com/Manta-Network/EthereumDappDevelopmentCourse/blob/session-4/session_4/contracts/MyNFT.sol)

OPTIOANL extensions
- metadata: IERC721Metadata
  - name: 
  A descriptive name for a collection of NFTs in this contract.

  - symbol: 
  An abbreviated name for NFTs in this contract

  - tokenURI: 
  A distinct Uniform Resource Identifier (URI) for a given asset.

- enumeration: ERC721Enumerable(includes ERC721 & IERC721Metadata)
  - totalSupply: 
  Count NFTs tracked by this contract

  - tokenByIndex:
  Enumerate valid NFTs

  - tokenOfOwnerByIndex:
  Enumerate NFTs assigned to an owner

