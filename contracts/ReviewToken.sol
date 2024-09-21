// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/Math.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ReviewToken is ERC721URIStorage, Ownable {
    // tokenfor company = hash(user + company + 1)
    // tokenfor user = hash(user + company + 0);
    // actual token = hash(user + company)
    // token -> Review Data
    // onlyOwner of Token can view its status or contract owner

    uint private _counter;

    struct ReviewDataStruct{
        uint8 rating;
        bool isScam;
        string review;
        uint serviceId;
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

    constructor() ERC721("Soul Bound Review Token", "SBRT") Ownable(msg.sender) {
        _counter = 666587;
    }

    function _generateSecret(address user, address companyId, uint serviceId) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(user, companyId, serviceId)));
    }

    function _getCounterAndIncrement() internal returns (uint256) {
        return _counter++;
    }

    // Function to mint a new token, only storing metadata URI
    function mintToken(address _user, address _companyId, uint _serviceId, uint8 _rating, bool _isScam, string memory _review, string memory _metadataURI) external onlyOwner {
        uint256 secret = _generateSecret(_user, _companyId, _serviceId);
        require(!_SBTissued[secret], "SBT can be issued only once to a user and service combination1");
        require(_addressToRole[_user] != COMPANY, "User can't act as a company!");
        require(_addressToRole[_companyId] != USER, "Company can't act as a user!");

        uint256 userTokenId = _getCounterAndIncrement();
        uint256 companyTokenId = _getCounterAndIncrement();

        _safeMint(_user, userTokenId);
        _setTokenURI(userTokenId, _metadataURI);
        _tokenIdToSecret[userTokenId] = secret;
        _addressToRole[_user] = USER;

        _safeMint(_companyId, companyTokenId);
        _setTokenURI(companyTokenId, _metadataURI);
        _tokenIdToSecret[companyTokenId] = secret;
        _addressToRole[_companyId] = COMPANY;

        _secretToReview[secret] = ReviewDataStruct(_rating, _isScam, _review, _serviceId);
        _SBTissued[secret] = true;
    }

    function ownerOfTokenIds(address tokenOwner) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](balanceOf(tokenOwner));
        uint256 index = 0;
        for (uint256 i = 0; i < _counter; i++) {
            if (ownerOf(i) == tokenOwner) {
                result[index] = i;
                index++;
            }
        }
        return result;
    }

    function getAllReviews(address tokenOwner) external view returns(ReviewDataStruct[] memory) {
        require((_addressToRole[tokenOwner] == COMPANY) || (msg.sender == tokenOwner), "Reviews given by a user can only be seen by users!");
        ReviewDataStruct[] memory result = new ReviewDataStruct[](balanceOf(tokenOwner));
        uint256[] memory tokensOwned = new uint256[](balanceOf(tokenOwner));
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
        uint256[] memory tokensOwned = new uint256[](balanceOf(tokenOwner));
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

    // Function to check if a token exists
    function _exists(uint256 _tokenId) internal view returns (bool) {
        return (_ownerOf(_tokenId) != address(0));
    }

    // Override transfer functions to ensure non-transferability
    function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721, IERC721) {
        require(false,"Non-transferable token");
        from = from;
        to = to;
        tokenId = tokenId;
    }

    function approve(address to, uint256 tokenId) public virtual override(ERC721, IERC721) {
        require(false,"Non-transferable token");
        to = to;
        tokenId = tokenId;
    }

    function setApprovalForAll(address operator, bool approved) public virtual override(ERC721, IERC721) {
        require(false,"Non-transferable token");
        operator = operator;
        approved = approved;
    }
}