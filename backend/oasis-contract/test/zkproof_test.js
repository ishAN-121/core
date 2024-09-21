it("Should verify proof correctly during minting", async function () {
    const user = ethers.Wallet.createRandom();
    const company = ethers.Wallet.createRandom();
    const serviceId = 1;
    const invalidProof = Array(31).fill(2);  // Incorrect proof for testing

    await expect(
        reviewToken.mintToken(user.address, company.address, 1, 2, invalidProof, serviceId, 5, false, "Invalid proof test")
    ).to.be.revertedWith("Proof failed!");
});
