require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const YOUR_PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
// Hardhat configuration ...
  networks: {
    devnet: {
      url: "https://network.ambrosus-dev.io",
      accounts: [YOUR_PRIVATE_KEY]
    },
    testnet: {
      url: "https://network.ambrosus-test.io",
      accounts: [YOUR_PRIVATE_KEY]
    },
    mainnet: {
      url: "https://network.ambrosus.io",
      accounts: [YOUR_PRIVATE_KEY]
    }
  },
  solidity: {
    // Solc configuration ...
    version: "0.8.20",
    settings: {
      evmVersion: "istanbul",
    }
  },
  etherscan: { 
    enabled: false
  },
  sourcify: {
    enabled: true,
    apiUrl: "https://sourcify.ambrosus.io/"
  },
// Hardhat configuration ...
}