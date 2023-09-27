import { expect } from "chai";
import { Signer } from "ethers";
import { ethers, upgrades } from "hardhat";
import { getBigInt } from "ethers";

describe("Upgradable contract", async function () {
  let admin: Signer;
  let user: Signer;

  this.beforeAll(async () => {
    const [signer_1, signer_2] = await ethers.getSigners();

    admin = signer_1 as any as Signer;
    user = signer_2 as any as Signer;
  });

  it("transparent proxy", async function () {
    const Transparent_Proxy_NFT = await ethers.getContractFactory(
      "Transparent_Proxy_NFT",
      admin as any as Signer
    );

    // deploy proxy
    console.log("Deploying Transparent_Proxy_ERC721...");
    const proxy = await upgrades.deployProxy(
      Transparent_Proxy_NFT as any,
      ["MyNFT", "M"],
      { initializer: "initialize", kind: "transparent" }
    );
    console.log("proxy deployed to:", await proxy.getAddress());

    // upgrade logic contract
    const Upgraded_Transparent_Proxy_NFT = await ethers.getContractFactory(
      "Upgraded_Transparent_Proxy_NFT",
      admin as any as Signer
    );

    await upgrades.upgradeProxy(
      await proxy.getAddress(),
      Upgraded_Transparent_Proxy_NFT as any
    );

    // set royalty
    const upgraded_proxy = await Upgraded_Transparent_Proxy_NFT.attach(
      await proxy.getAddress()
    );

    const roylaty = getBigInt("100");
    await upgraded_proxy.connect(admin).setRoyalty("100");

    // fetch royalty
    const onChainRoyalty = await upgraded_proxy.connect(user).royalty();

    expect(onChainRoyalty).to.equal(roylaty);
  });
  it('uups proxy',async function() {
    const UUPS_Proxy_NFT = await ethers.getContractFactory(
        "UUPS_Proxy_NFT",
        admin as any as Signer
      );
  
      // deploy proxy
      console.log("Deploying UUPS_Proxy_NFT...");
      const proxy = await upgrades.deployProxy(
        UUPS_Proxy_NFT as any,
        ["MyNFT", "M"],
        { initializer: "initialize", kind: "uups" }
      );
      console.log("proxy deployed to:", await proxy.getAddress());
  
      // upgrade logic contract
      const Upgraded_UUPS_Proxy_NFT = await ethers.getContractFactory(
        "Upgraded_UUPS_Proxy_NFT",
        admin as any as Signer
      );
  
      await upgrades.upgradeProxy(
        await proxy.getAddress(),
        Upgraded_UUPS_Proxy_NFT as any
      );
  
      // set royalty
      const upgraded_proxy = await Upgraded_UUPS_Proxy_NFT.attach(
        await proxy.getAddress()
      );
  
      const roylaty = getBigInt("100");
      await upgraded_proxy.connect(admin).setRoyalty("100");
  
      // fetch royalty
      const onChainRoyalty = await upgraded_proxy.connect(user).royalty();
  
      expect(onChainRoyalty).to.equal(roylaty);
  })
});
