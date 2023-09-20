import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { ForLoopExample } from '../types/Level1/ForLoopExample';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: ForLoopExample

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("ForLoopExample")).deploy() as ForLoopExample
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })

})
