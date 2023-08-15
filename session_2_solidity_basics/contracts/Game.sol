//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Game {
    // Token name
    string public name;

    // Token symbol
    string public symbol;

    // admin of this game
    address public admin;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "caller is not admin");
        _;
    }

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        admin = msg.sender;
    }

    /**
     * @dev Returns whether `tokenId` exists.
     */
    function exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function mint(address to, uint256 tokenId) public virtual onlyAdmin {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!exists(tokenId), "ERC721: token already minted");

        _balances[to] += 1;

        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev transfer token specified by `tokenId` from `from` to `to`
     */
    function transferFrom(address from, address to, uint256 tokenId) public {
        //solhint-disable-next-line max-line-length
        require(
            ownerOf(tokenId) == msg.sender ||
                _tokenApprovals[tokenId] == msg.sender,
            "caller is not the token owner or approved account"
        );

        _balances[from] -= 1;
        _balances[to] += 1;

        _owners[tokenId] = to;

        // Clear approvals from the previous owner
        delete _tokenApprovals[tokenId];

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev return token amount of certain account
     */
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "address zero is not a valid owner");
        return _balances[owner];
    }

    /**
     * @dev Returns the owner of the `tokenId`. Does NOT revert if token doesn't exist
     */
    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     */
    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "approval to current owner");

        require(msg.sender == owner, "approve caller is not token owner");

        _approve(to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits an {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }
}
