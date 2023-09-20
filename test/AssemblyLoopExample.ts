import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { AssemblyLoopExample } from '../types/Level2/AssemblyLoopExample';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: AssemblyLoopExample

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("AssemblyLoopExample")).deploy() as AssemblyLoopExample
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })

})
