import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { StorageExample } from '../types/Level1/StorageExample';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: StorageExample

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("StorageExample")).deploy() as StorageExample
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })

})
