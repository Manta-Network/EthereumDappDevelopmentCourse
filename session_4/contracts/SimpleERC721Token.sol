// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    // Mapping from tokenID to owner
    mapping(uint256 => address) private tokenOwners;

    // Mapping from user to count of nfts
    mapping(address => uint256) private balances;

    // Mapping from tokenID to approved address
    // approved address can transfer the token
    mapping(uint256 => address) private tokenApprovals;

    // Mapping from owner to operator approvals
    // operator can transfer owner's all nfts
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
        operatorApprovals[msg.sender][operator] = _approved;
        emit ApprovalForAll(msg.sender, operator, _approved);
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view returns (bool) {
        return operatorApprovals[owner][operator];
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        /*
          - owner can transfer NFT
          - operator of the owner can transfer NFT
          - operator of the token can transfer NFT
        */
        address owner = tokenOwners[tokenId];
        require(
            msg.sender == owner ||
                isApprovedForAll(owner, msg.sender) ||
                getApproved(tokenId) == msg.sender
        );
        require(from == tokenOwners[tokenId], "Not the token owner");

        tokenOwners[tokenId] = to;
        balances[from] -= 1;
        balances[to] += 1;

        delete tokenApprovals[tokenId];

        emit Transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public {
        transferFrom(from, to, tokenId);
        // if to is a contract address, data will be executed
        if (to.code.length > 0) {
            (bool success, ) = to.call(data);
            require(success);
        }
    }
}
