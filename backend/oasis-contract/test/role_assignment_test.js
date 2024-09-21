it("Should assign correct roles to users and companies", async function () {
    const user = ethers.Wallet.createRandom();
    const company = ethers.Wallet.createRandom();
    const serviceId = 1;
    const proof = Array(31).fill(1); // Dummy proof

    await reviewToken.mintToken(user.address, company.address, 1, 2, proof, serviceId, 5, false, "Good service!");

    const userRole = await reviewToken._addressToRole(user.address);
    const companyRole = await reviewToken._addressToRole(company.address);

    expect(userRole).to.equal(1);  // 1 = USER
    expect(companyRole).to.equal(2);  // 2 = COMPANY
});
