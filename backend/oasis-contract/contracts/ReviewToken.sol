// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract ReviewToken is Ownable {
    // tokenfor company = hash(user + company + 1)
    // tokenfor user = hash(user + company + 0);
    // actual token = hash(user + company)
    // token -> Review Data
    // onlyOwner of Token can view its status or contract owner

    uint private _counter;

    uint256 public p = 100000009;
    uint256 public g = 452942827;
    uint256 public length = 10;

    function modExp(uint256 base, uint256 exponent, uint256 modulus) internal pure returns (uint256 result) {
        // This is an efficient way of doing (base^exponent) % modulus
        result = 1;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result = (result * base) % modulus;
            }
            base = (base * base) % modulus;
            exponent = exponent / 2;
        }
    }

    modifier verifyProof(uint256[] memory proof) {
        require(proof.length == 31, "Invalid Proof length!");
        uint256 PK = proof[0];
        uint256[] memory proofElements = new uint[](31);
        bool valid = true;

        for (uint256 i = 0; i < 30; i++) {
            proofElements[i] = proof[i+1];
        }

        proofElements[30] = proofElements[29] + proofElements[28] + proofElements[27];

        for (uint256 i = 0; i < length; i++) {
            uint256 v = proofElements[3 * i];
            uint256 gv = proofElements[3 * i + 1];
            uint256 xv = proofElements[3 * i + 2];

            if (modExp(g, v, p) != gv % p) {
                valid = false;
                break;
            }
            if (modExp(g, xv, p) != (PK * modExp(g, v, p)) % p) {
                valid = false;
                break;
            }
            if (proofElements[3 * i + 3] % p != (v + gv + xv) % p) {
                valid = false;
                break;
            }
        }

        require(valid, "Proof failed!");
        _;
    }

    struct ReviewDataStruct{
        uint8 rating;
        bool isScam;
        string review;
        uint serviceId;
        uint[] proof;
    }

    struct AverageReviewStruct{
        uint256 totalRatingScore;
        uint256 scamReports;
        uint256 totalReviews;
    }

    uint8 private UNDECIDED = 0;
    uint8 private USER = 1; 
    uint8 private COMPANY = 2;

    mapping(uint256=>bool) private _SBTissued;
    mapping(uint256=>ReviewDataStruct) private _secretToReview;
    mapping(uint256=>uint256) private _tokenIdToSecret;
    mapping(address=>uint8) private _addressToRole;
    mapping(uint256=>address) private _tokenIdToOwner;
    mapping(address=>uint256) private _balanceOfAddress;

    constructor() Ownable(msg.sender) {
        _counter = 0;
    }

    function _generateSecret(address user, address companyId, uint serviceId) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(user, companyId, serviceId)));
    }

    // Function to mint a new token, only storing metadata URI
    function mintToken(address _user, address _companyId, uint _userTokenId, uint _companyTokenId, uint[] memory _proof, uint _serviceId, uint8 _rating, bool _isScam, string memory _review) external onlyOwner {
        uint256 secret = _generateSecret(_user, _companyId, _serviceId);
        require(!_SBTissued[secret], "SBT can be issued only once to a user and service combination1");
        require(_addressToRole[_user] != COMPANY, "User can't act as a company!");
        require(_addressToRole[_companyId] != USER, "Company can't act as a user!");

        _tokenIdToOwner[_userTokenId] = _user;
        _balanceOfAddress[_user]++;
        _tokenIdToSecret[_userTokenId] = secret;
        _addressToRole[_user] = USER;

        _tokenIdToOwner[_companyTokenId] = _companyId;
        _balanceOfAddress[_companyId]++;
        _tokenIdToSecret[_companyTokenId] = secret;
        _addressToRole[_companyId] = COMPANY;

        _secretToReview[secret] = ReviewDataStruct(_rating, _isScam, _review, _serviceId, _proof);
        _SBTissued[secret] = true;

        _counter+=2;
    }

    function ownerOfTokenIds(address tokenOwner) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](_balanceOfAddress[tokenOwner]);
        uint256 index = 0;
        for (uint256 i = 0; i < _counter; i++) {
            if (_tokenIdToOwner[i] == tokenOwner) {
                result[index] = i;
                index++;
            }
        }
        return result;
    }

    function getAllReviews(address tokenOwner) external view returns(ReviewDataStruct[] memory) {
        require((_addressToRole[tokenOwner] == COMPANY) || (msg.sender == tokenOwner), "Reviews given by a user can only be seen by users!");
        ReviewDataStruct[] memory result = new ReviewDataStruct[](_balanceOfAddress[tokenOwner]);
        uint256[] memory tokensOwned = new uint256[](_balanceOfAddress[tokenOwner]);
        tokensOwned = ownerOfTokenIds(tokenOwner);
        for(uint256 i = 0; i < tokensOwned.length; i++){
            result[i] = _secretToReview[_tokenIdToSecret[tokensOwned[i]]];
        }
        return result;
    }

    function getAvgRatingForService(address tokenOwner, uint256 serviceId) external view returns (AverageReviewStruct memory) {
        uint256 ratingScore = 0;
        uint256 scamReports = 0;
        uint256 totalReviews = 0;
        uint256[] memory tokensOwned = new uint256[](_balanceOfAddress[tokenOwner]);
        tokensOwned = ownerOfTokenIds(tokenOwner);
        for(uint256 i = 0; i < tokensOwned.length; i++){
            ReviewDataStruct memory temp = _secretToReview[_tokenIdToSecret[tokensOwned[i]]];
            if(temp.serviceId != serviceId) continue;
            ratingScore += temp.rating;
            if(temp.isScam) scamReports++;
            totalReviews++;
        }   
        AverageReviewStruct memory result = AverageReviewStruct(ratingScore, scamReports, totalReviews);
        return result;
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        return (_tokenIdToOwner[_tokenId] != address(0));
    }
}