// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InfoAccessV3 {
    address public chatbotOwner;
    uint256 public constant MIN_FEE = 0.001 ether;

    struct Site {
        string url;
        address payable wallet;
        bool isRegistered;
        uint256 totalEarned;
        uint256 totalDataScraped;
    }

    struct FetchRecord {
        address user;
        string topic;
        uint timestamp;
        uint amountPaid;
        uint dataScraped;
    }

    mapping(string => Site) public sites;
    mapping(string => FetchRecord[]) public fetchHistory;

    event SiteRegistered(string url, address wallet);
    event DataScraped(string url, string topic, uint dataScraped, uint amountPaid);
    event InfoFetched(address indexed user, string site, string topic, uint amountPaid, uint timestamp);

    constructor() {
        chatbotOwner = msg.sender;
    }

    // ✅ Register a new site
    function registerSite(string memory _url) public {
        require(!sites[_url].isRegistered, "Already registered");

        sites[_url] = Site({
            url: _url,
            wallet: payable(msg.sender),
            isRegistered: true,
            totalEarned: 0,
            totalDataScraped: 0
        });

        emit SiteRegistered(_url, msg.sender);
    }

    // ✅ Called by chatbotOwner to log how much data was scraped
    // Now includes the topic
    function logScrapedData(string memory _url, string memory _topic, uint256 dataAmount) public payable {
        require(msg.sender == chatbotOwner, "Only chatbot owner can log");
        require(sites[_url].isRegistered, "Site not registered");

        uint256 requiredPayment = dataAmount * 0.000001 ether;
        if (requiredPayment < MIN_FEE) {
            requiredPayment = MIN_FEE;
        }

        require(msg.value >= requiredPayment, "Insufficient payment");

        Site storage site = sites[_url];
        site.totalDataScraped += dataAmount;
        site.totalEarned += msg.value;

        site.wallet.transfer(msg.value);

        // ✅ Add record to history including the topic
        fetchHistory[_url].push(FetchRecord({
            user: chatbotOwner,
            topic: _topic,
            timestamp: block.timestamp,
            amountPaid: msg.value,
            dataScraped: dataAmount
        }));

        emit DataScraped(_url, _topic, dataAmount, msg.value);
    }

    function fetchInfo(string memory _siteUrl, string memory _topic, uint256 dataScraped) public payable {
        Site storage site = sites[_siteUrl];
        require(site.isRegistered, "Site not registered");

        uint256 fee = dataScraped * 0.000001 ether;
        if (fee < MIN_FEE) {
            fee = MIN_FEE;
        }

        require(msg.value >= fee, "Insufficient fee");

        site.wallet.transfer(msg.value);

        site.totalEarned += msg.value;
        site.totalDataScraped += dataScraped;

        fetchHistory[_siteUrl].push(FetchRecord({
            user: msg.sender,
            topic: _topic,
            timestamp: block.timestamp,
            amountPaid: msg.value,
            dataScraped: dataScraped
        }));

        emit InfoFetched(msg.sender, _siteUrl, _topic, msg.value, block.timestamp);
    }

    function getFetchHistory(string memory _siteUrl) public view returns (FetchRecord[] memory) {
        return fetchHistory[_siteUrl];
    }
}
