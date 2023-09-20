import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers } from 'hardhat';
import { UncheckedOverflow } from '../types/Level1/UncheckedOverflow';



describe('tests', function () {
    let signers: SignerWithAddress[];
    let contract: UncheckedOverflow

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("UncheckedOverflow")).deploy() as UncheckedOverflow
    });

    it('run all test', async function () {
        await contract.bad()
        await contract.good()
    })
})
