# Review Token - Smart Contract Documentation

The Review Token smart contract implements a soul-bound token system, where unique tokens are issued to users and companies after a service interaction. The tokens contain review data, and once issued, they are immutable and non-transferable. This contract allows reviews to be attached to both users and companies in a verifiable manner and includes cryptographic proof mechanisms for added security. The contract is designed for handling ratings, scam reports, and reviews, as well as calculating the average ratings for specific services.

---
### Key Features

**1) Soul-Bound Tokens (SBTs):** Tokens are issued uniquely for each user-company-service combination, with dual ownership—one for the user and one for the company. Tokens are non-transferable.

**2)Review Data Storage:** Each token contains review data, including a rating, a scam report flag, a written review, and cryptographic proof of the review.

**3) ZK Verification:** A cryptographic zero knowledge proof is required and verified for each review, adding an additional layer of authenticity.

**4) Access Control:** Only the contract owner can mint tokens, and only users and companies can access their own reviews.

**5) Rating Aggregation:** The contract can calculate the average rating and scam report count for a given service.

---

### Structures

**1. ReviewDataStruct**

Stores the data for each review, including:

    rating: A rating from 1 to 5.
    isScam: A boolean flag indicating whether the service is considered a scam.
    review: The textual content of the review.
    serviceId: The ID of the service being reviewed.
    proof: An array of cryptographic proof elements for the review.

**2. AverageReviewStruct**

Used to store aggregated review data, including:

    totalRatingScore: The cumulative score of all ratings for the service.
    scamReports: The number of scam reports for the service.
    totalReviews: The total number of reviews for the service.

---

### Usage

**1)Minting a Token:** Only the contract owner can mint tokens using the mintToken function. It requires zero knowledge proof, the user and company addresses, token IDs, review data, and the service ID.

**2)Fetching Owned Tokens:** The ownerOfTokenIds function retrieves all token IDs owned by an address.

**3)Viewing Reviews:** Reviews can be fetched using getAllReviews, and the average rating for a service can be calculated using getAvgRatingForService.

---

### Testing instructions

1) Install hardhat
2) Install openzepplin
3)Run the tests in the test folder