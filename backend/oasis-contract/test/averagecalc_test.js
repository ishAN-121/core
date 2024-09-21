it("Should correctly calculate the average rating and scam reports", async function () {
    const user1 = ethers.Wallet.createRandom();
    const user2 = ethers.Wallet.createRandom();
    const company = ethers.Wallet.createRandom();
    const serviceId = 1;
    const proof = Array(31).fill(1); // Dummy proof

    await reviewToken.mintToken(user1.address, company.address, 1, 2, proof, serviceId, 4, false, "Good service!");
    await reviewToken.mintToken(user2.address, company.address, 3, 4, proof, serviceId, 5, true, "Possible scam!");

    const avgReviewData = await reviewToken.getAvgRatingForService(company.address, serviceId);

    expect(avgReviewData.totalRatingScore).to.equal(9);  // 4 + 5 = 9
    expect(avgReviewData.scamReports).to.equal(1);  // 1 report of scam
    expect(avgReviewData.totalReviews).to.equal(2);  // 2 reviews in total
});
