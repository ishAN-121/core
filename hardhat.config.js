// require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-verify");
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
// require("./tasks/faucet");
require('dotenv').config()

const YOUR_PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
// Hardhat configuration ...
  solidity: {
    // Solc configuration ...
    version: "0.8.20",
    settings: {
      evmVersion: "istanbul",
    }
  },
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
  etherscan: { 
    enabled: false
  },
  sourcify: {
    enabled: true,
    apiUrl: "https://sourcify.ambrosus.io/"
  },
}