const { expect } = require("chai");

describe("ReviewToken Contract", function () {
    let ReviewToken;
    let reviewToken;
    let owner;

    beforeEach(async function () {
        ReviewToken = await ethers.getContractFactory("ReviewToken");
        [owner] = await ethers.getSigners();
        reviewToken = await ReviewToken.deploy();
        await reviewToken.deployed();
    });

    it("Should deploy successfully and set the owner", async function () {
        expect(await reviewToken.owner()).to.equal(owner.address);
    });
});
