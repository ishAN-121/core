it("Should mint a new token for user and company", async function () {
    const user = ethers.Wallet.createRandom();
    const company = ethers.Wallet.createRandom();
    const serviceId = 1;
    const rating = 5;
    const isScam = false;
    const reviewText = "Excellent service!";
    const proof = Array(31).fill(1); // Dummy proof

    const userTokenId = 1;
    const companyTokenId = 2;

    await reviewToken.mintToken(user.address, company.address, userTokenId, companyTokenId, proof, serviceId, rating, isScam, reviewText);

    const userReviews = await reviewToken.getAllReviews(user.address);
    expect(userReviews.length).to.equal(1);
    expect(userReviews[0].rating).to.equal(rating);
    expect(userReviews[0].isScam).to.equal(isScam);
    expect(userReviews[0].review).to.equal(reviewText);

    const companyReviews = await reviewToken.getAllReviews(company.address);
    expect(companyReviews.length).to.equal(1);
});
