# Soul Bound Token (SBT) - Smart Contract Documentation
### Overview

This Solidity smart contract implements a Soul Bound Token (SBT) standard on the AIRDAO blockchain. Here, SBT is a non-transferable,issued to users and companies as a dual ownership mechanism. In our project we use SBT for review system. SO here, this token records the metadata associated with reviews, and both users and companies receive tokens to ensure both parties are bound by the review. The contract follows the ERC-721 standard for NFTs, extended by the ERC721URIStorage contract to store metadata, and incorporates access control via Ownable.

---

### Features

**1) Dual Token Issuance:** For every service review, both the user and the company receive a co ownership soul based token, ensuring both have proof of the interaction.

**2) Non-transferability:** Tokens cannot be transferred, maintaining the immutability of reviews and ensuring that tokens are tied to the original reviewer and company.

**3)Metadata Storage:** Each token stores a URI linking to metadata, which could contain the review details.

**4)Role-Based Access Control:** The contract enforces role checks, preventing users from acting as companies and vice versa.

**5)Role Management:** Roles for addresses are tracked using a mapping, _addressToRole. There are three possible roles:

UNDECIDED (0): Default role, no specific role is 
assigned yet.

USER (1): Assigned to users who receive Soul Bound Tokens.

COMPANY (2): Assigned to companies when they receive their tokens.

----

### Usage

1. Add key to .env file. 

2. After adding the key Run the following  
```
npx hardhat compile
```
 
```
npx hardhat ignition deploy ./ignition/modules/Token.js --network mainnet
```
3. We have deployed to mainnet, because the testnet was down while we were deploying