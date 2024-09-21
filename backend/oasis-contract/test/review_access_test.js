it("Should restrict review access", async function () {
    const user = ethers.Wallet.createRandom();
    const company = ethers.Wallet.createRandom();
    const serviceId = 1;
    const proof = Array(31).fill(1); // Dummy proof

    await reviewToken.mintToken(user.address, company.address, 1, 2, proof, serviceId, 5, false, "Confidential review");

    // Expect the user to view their own reviews
    const userReviews = await reviewToken.getAllReviews(user.address);
    expect(userReviews.length).to.equal(1);

    // Other addresses should not have access
    const outsider = ethers.Wallet.createRandom();
    await expect(
        reviewToken.connect(outsider).getAllReviews(user.address)
    ).to.be.revertedWith("Reviews given by a user can only be seen by users!");
});
