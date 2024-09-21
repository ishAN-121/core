it("Should not allow duplicate SBT issuance for same user-service combination", async function () {
    const user = ethers.Wallet.createRandom();
    const company = ethers.Wallet.createRandom();
    const serviceId = 1;
    const proof = Array(31).fill(1); // Dummy proof

    await reviewToken.mintToken(user.address, company.address, 1, 2, proof, serviceId, 5, false, "Good service!");

    await expect(
        reviewToken.mintToken(user.address, company.address, 3, 4, proof, serviceId, 5, false, "Duplicate attempt")
    ).to.be.revertedWith("SBT can be issued only once to a user and service combination1");
});
