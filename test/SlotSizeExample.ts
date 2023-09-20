import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { SlotSizeBadExample } from '../types/Level2/SlotSizeExample.sol/SlotSizeBadExample';
import { SlotSizeGoodExample } from '../types/Level2/SlotSizeExample.sol/SlotSizeGoodExample';




describe('tests', function () {
    let signers: SignerWithAddress[];
    let bad: SlotSizeBadExample
    let good: SlotSizeGoodExample


    beforeEach(async function () {
        signers = await ethers.getSigners();
        bad = await (await ethers.getContractFactory("SlotSizeBadExample")).deploy() as SlotSizeBadExample
        good = await (await ethers.getContractFactory("SlotSizeGoodExample")).deploy() as SlotSizeGoodExample

    });

    it('run all test', async function () {
        await bad.set()
        await good.set()
    })

})
