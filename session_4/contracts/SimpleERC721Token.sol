// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleERC721Token {
    uint256 public tokenIdCounter;

    // Mapping from tokenID to owner
    mapping(uint256 => address) private tokenOwners;

    // Mapping from owner to count of nfts
    mapping(address => uint256) private balances;

    // Mapping from tokenID to operator
    // operator can transfer the token
    mapping(uint256 => address) private tokenApprovals;

    // Mapping from owner to operator,
    // operator can transfer all nfts of the owner
    mapping(address => mapping(address => bool)) private operatorApprovals;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    constructor() {}

    function mint() external {
        tokenOwners[tokenIdCounter] = msg.sender;
        tokenIdCounter++;

        balances[msg.sender] += 1;
    }

    function balanceOf(address owner) external view returns (uint256) {
        return balances[owner];
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return tokenOwners[tokenId];
    }

    function approve(address operator, uint256 tokenId) external {
        address owner = tokenOwners[tokenId];
        require(msg.sender == owner, "Not the token owner");
        require(msg.sender != operator, "Cannot approve to self");

        tokenApprovals[tokenId] = operator;
        emit Approval(owner, operator, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool _approved) external {
        address owner = msg.sender;

        operatorApprovals[owner][operator] = _approved;
        emit ApprovalForAll(owner, operator, _approved);
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view returns (bool) {
        return operatorApprovals[owner][operator];
    }

    function transferFrom(
        address from,
        address receiver,
        uint256 tokenId
    ) public {
        /*
          - caller is the owner of the token
          - caller is the operator of the token's owner
          - caller is the operator of the token
        */
        address owner = tokenOwners[tokenId];
        require(
            msg.sender == owner ||
                isApprovedForAll(owner, msg.sender) ||
                getApproved(tokenId) == msg.sender
        );
        require(from == tokenOwners[tokenId], "Not the token owner");

        tokenOwners[tokenId] = receiver;
        balances[from] -= 1;
        balances[receiver] += 1;

        // need to delete the tokenApprovals because the token's owner has changed
        delete tokenApprovals[tokenId];

        emit Transfer(from, receiver, tokenId);
    }

    function safeTransferFrom(address from, address receiver, uint256 tokenId) external {
        safeTransferFrom(from, receiver, tokenId, "");
    }

    function safeTransferFrom(address from, address receiver, uint256 tokenId, bytes memory data) public {
        transferFrom(from, receiver, tokenId);
        // if to is a contract address, data will be executed
        if (receiver.code.length > 0) {
            // call the to address
        }
    }
}
