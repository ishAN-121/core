const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ReviewTokenModule = buildModule("ReviewTokenModule", (m) => {
  const token = m.contract("ReviewToken");

  return { token };
});

module.exports = ReviewTokenModule;