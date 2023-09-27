pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Upgraded_UUPS_Proxy_NFT is
    Initializable,
    ERC721Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    bool public openToMint;
    uint256 public royalty;

    function initialize(
        string memory _name,
        string memory _symbol
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function setOpenToMint(bool _openToMint) public onlyOwner {
        openToMint = _openToMint;
    }

    function setRoyalty(uint256 _royalty) public onlyOwner {
        royalty = _royalty;
    }
}
