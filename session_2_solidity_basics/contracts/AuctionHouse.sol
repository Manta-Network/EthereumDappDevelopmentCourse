//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./interfaces/IItem.sol";

contract AuctionHouse {
    // information of an auction
    struct Auction {
        string name; // the name of this auction
        address payable seller; // the seller of this auction
        uint startPrice; // the start price of the item
        uint startBlock; // the start block of the auction
        uint endBlock; // the end block of the auction
        address highestBidder; // the address of the bidder bids the highest price
        uint highestBid; // the price of the highest bid
        address token; // the address of the contract this item belongs
        uint256 identifier; // the identifier of this item
    }

    // administrator of this contract
    address public admin;

    // record auctionId's corresponding auction information
    mapping(uint => Auction) public auctions;

    // Added pendingReturns mapping
    mapping(address => uint) public pendingReturns;

    uint public nextAuctionId;

    // whether this auction house has been paused
    bool private _auctionHousePaused;

    event CreateAuction(
        address indexed seller,
        uint256 indexed auctionId,
        address indexed token,
        uint256 identifier
    );

    event NewBid(
        uint indexed auctionId,
        address indexed oldHighestBidder,
        address indexed newHighestBidder,
        uint256 oldBidPrice,
        uint256 newBidPrice
    );

    event EndAuction(
        uint indexed auctionId,
        address indexed bidder,
        uint256 bidPrice
    );

    constructor() {
        admin = msg.sender;
        _auctionHousePaused = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "ONLY ADMIN");
        _;
    }

    modifier onlyOpen() {
        require(!_auctionHousePaused, "ONLY OPEN");
        _;
    }

    function pauseAuctionHouse(bool _paused) public onlyAdmin {
        _auctionHousePaused = _paused;
    }

    function createAuction(
        string memory name,
        uint startPrice,
        uint startBlock,
        uint endBlock,
        address token,
        uint256 identifier
    ) public onlyOpen returns (uint) {
        uint assignedAuctionId = nextAuctionId;

        Auction storage auction = auctions[assignedAuctionId];
        auction.name = name;
        auction.seller = payable(msg.sender);
        auction.startPrice = startPrice;
        auction.startBlock = startBlock;
        auction.endBlock = endBlock;
        auction.token = token;
        auction.identifier = identifier;

        emit CreateAuction(msg.sender, nextAuctionId, token, identifier);

        nextAuctionId++;

        return assignedAuctionId;
    }

    function bid(uint auctionId) public payable virtual onlyOpen {
        Auction storage auction = auctions[auctionId];

        require(block.number >= auction.startBlock, "invalid time:1");
        require(block.number <= auction.endBlock, "invalid time:2");
        require(msg.value > auction.highestBid, "lower than start price");

        if (auction.highestBidder != address(0)) {
            pendingReturns[auction.highestBidder] += auction.highestBid;
        }

        emit NewBid(
            auctionId,
            auction.highestBidder,
            msg.sender,
            auction.highestBid,
            msg.value
        );

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }

    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            payable(msg.sender).transfer(amount);
            return true;
        }
        return false;
    }

    function auctionEnd(uint[] memory auctionIdLs) public {
        for (uint i = 0; i < auctionIdLs.length; i++) {
            uint auctionId = auctionIdLs[i];

            Auction storage auction = auctions[auctionId];

            require(block.number > auction.endBlock);
            require(msg.sender == auction.seller);

            auction.seller.transfer(auction.highestBid);

            IItem(auction.token).transferFrom(
                address(auction.seller),
                auction.highestBidder,
                auction.identifier
            );

            emit EndAuction(
                auctionId,
                auction.highestBidder,
                auction.highestBid
            );
        }
    }
}
