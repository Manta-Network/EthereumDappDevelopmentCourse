import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { ConstantStorageExample } from '../types/ConstantStorageExample';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: ConstantStorageExample

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("ConstantStorageExample")).deploy() as ConstantStorageExample
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })
})
