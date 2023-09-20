import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { Storage } from '../types/Storage';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: Storage

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("StorageExample")).deploy() as Storage
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })

})
