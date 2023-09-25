pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Transparent_Proxy_NFT is
    Initializable,
    ERC721Upgradeable,
    OwnableUpgradeable
{
    bool public openToMint;

    function initialize(
        string memory _name,
        string memory _symbol
    ) public initializer {
        openToMint = true;
        __ERC721_init(_name, _symbol);
        __Ownable_init();
    }

    function setOpenToMint(bool _openToMint) public onlyOwner {
        openToMint = _openToMint;
    }
}
