import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { NonzeroWriteExample } from '../types/Level2/NonzeroWriteExample';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: NonzeroWriteExample

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("NonzeroWriteExample")).deploy() as NonzeroWriteExample
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })
})
