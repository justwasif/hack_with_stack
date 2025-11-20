🛠️ How to Run ChainTalk Locally

Follow these steps to set up and run the project on your local machine:

1. Clone the Repository
git clone https://github.com/<your-username>/chain_talk.git
cd chain_talk

2. Install Dependencies

Make sure you have Node.js (v18 or above) installed, then run:

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add your Groq API key:

VITE_GROQ_API_KEY=your_groq_api_key_here


You can get your API key from https://console.groq.com
.

4. Set Smart Contract Details

In src/contract/index.js, export your deployed contract’s address and ABI:

export const CONTRACT_ADDRESS = "0xYourContractAddressHere";
export const CONTRACT_ABI = [ /* your ABI array */ ];

5. Start the Development Server

Run the app locally with:

npm run dev


Then open your browser and visit:
👉 http://localhost:5173

6. Connect Wallet

Make sure MetaMask is installed.

Connect your wallet to the same network where the smart contract is deployed (e.g., Ethereum testnet).

Once connected, you can register sites, interact with the chatbot, and view history.

7. Optional: Build for Production

To create an optimized build:

npm run build


Then preview it locally:

npm run preview

✅ You’re All Set!
------------------------------------------------------------------------------------------------------------------------------------------------------------------.

chain_talk 🤖🔗
A decentralized information marketplace bridging Web2 data with Web3 monetization.
Built for Syntax Error 2025

🚀 Overview
chain_talk creates a transparent and automated on-chain economy for information. Our platform empowers content creators (websites, blogs) to earn cryptocurrency directly when their data is used by our AI-powered chatbot. Users receive intelligent, synthesized answers from a powerful LLM, while the underlying data sources are compensated fairly and transparently through Ethereum smart contracts. It's a "fair-trade" model for the AI data pipeline.

🎯 Problem Statement
The Challenge: The Uncompensated Value of Data

In the age of AI, large language models are trained on and scrape vast amounts of public web data. However, the original creators of this valuable content receive no direct compensation for their contributions. The current ad-based monetization model is indirect, inefficient, and fails to reward high-quality information sources for their specific value to AI systems.

The Gap

There is no direct, transparent, or automated bridge for AI agents to pay for the specific data they consume. This leads to:

No Direct Monetization: Content creators are not paid for the value they provide to AI services.

Opaque Data Sourcing: Users of AI chatbots often don't know the origin of the information they receive.

Lack of On-Chain Provenance: There's no immutable record of data sourcing and usage.

Centralized Value Capture: Value is captured by the AI service provider, not the distributed network of content creators.

💡 Our Solution
chain_talk establishes a symbiotic ecosystem where information exchange is explicitly valued and recorded on-chain.

🔗 On-Chain Site Registration
A frictionless process for any website owner to register their URL and an Ethereum wallet address, making their content available for monetized scraping.

🤖 AI-Powered Data Fetching
Our chatbot, powered by the Groq API and Llama 3, understands user queries, identifies relevant registered data sources, and scrapes the necessary information in real-time.

💸 Pay-per-Scrape Micropayments
For every query answered using a registered site, our InfoAccessV3 smart contract facilitates a direct, on-chain payment from the user to the site owner. The fee is algorithmically determined by the amount of data scraped.

📊 Transparent History
Every data fetch and payment is logged as a transaction on the Ethereum blockchain, creating an immutable, publicly verifiable audit trail of data usage and compensation.

🛠 Technology Stack
Frontend & UI

Framework: Vite, React.js

Styling: Tailwind CSS

Animation: Framer Motion

Icons: Lucide React

Routing: React Router DOM

Blockchain & Web3

Smart Contract: Solidity

Blockchain: Ethereum (Sepolia Testnet)

IDE: Remix

Web3 Library: Ethers.js

AI & Backend

AI Provider: Groq API

LLM Model: llama-3.3-70b-versatile

🏗 Architecture Flow
Site Registration: A website owner visits the "Register Site" page, connects their wallet, and submits their URL. The registerSite function is called on our smart contract.

User Query: A user interacts with the chatbot, asking a question (e.g., "Summarize the history of Wikipedia").

Source Identification & Verification: The backend identifies the data source (wikipedia.org) and queries the blockchain to confirm it's a registered site with a valid wallet address.

On-Chain Transaction:

If registered, the frontend calculates the fee based on the expected data size (e.g., 50KB * fee per KB).

It prompts the user to approve a transaction via their wallet, calling the fetchInfo function in the smart contract and sending the required ETH fee.

Data Scraping & AI Processing:

Upon transaction confirmation on the blockchain, the backend scrapes the data from the registered site.

The scraped content is passed as context to the Groq API.

The Llama 3 LLM generates a concise, user-friendly response.

Response & Record: The AI's response is displayed to the user. The transaction is permanently recorded and visible on the "History" page.

Off-Chain Fallback: If a data source is not registered, the chatbot scrapes the data without any blockchain interaction or payment, ensuring the chatbot remains fully functional.

🚀 Deployed Contract
Network: Sepolia Testnet

Contract: InfoAccessV3

Address: 0x... (Replace with your deployed contract address)

Explorer: View on Sepolia Etherscan (Replace with your link)

🔄 How It Works
Step 1: Register Your Content
Website owners provide their URL and wallet address to join the network and become eligible for rewards.

Step 2: Ask the AI
Users ask the chatbot any question. The system determines the best source of information.

Step 3: Fuel the Knowledge
If the chatbot needs to use data from a registered site, the user is prompted for a small crypto payment to directly reward the creator.

Step 4: Get Your Answer
Upon payment confirmation, the AI provides the answer, and the content creator is paid instantly. All activity is viewable on the public transaction history.

🎯 Key Features
For Content Creators:

Direct Monetization: Earn crypto automatically every time your content is used.

Transparent Auditing: On-chain proof of every data fetch and payment.

Seamless Onboarding: Simple, one-time registration process.

For Users:

AI-Powered Insights: Get high-quality answers from a state-of-the-art LLM.

Fair-Trade Data: Support the creators of the information you consume directly.

Transparent Sourcing: See exactly where the information came from and how much was paid for it.

🔮 Future Roadmap
Phase 1 (Current)

✅ Core smart contract for registration and payment.

✅ Functional React frontend with Ethers.js integration.

✅ Groq API integration for AI chat.

✅ On-chain history viewer.

Phase 2 (Next Quarter)

🔄 Layer 2 Deployment: Migrate to a low-cost L2 like Polygon, Arbitrum, or Base to make micropayments near-instant and almost free.

🔄 Creator Dashboard: Build a dedicated dashboard for registered site owners to track earnings, data usage trends, and popular topics.

🔄 Browser Extension: Create a browser extension to allow users to tip or query registered sites directly while browsing.

Phase 3 (Long Term)

🤝 Decentralized Governance (DAO): Introduce a governance model for the community to vote on platform fees, feature development, and dispute resolution.

🌐 Multi-Modal Data: Expand beyond text to allow monetization of images, videos, and other forms of data.

📜 License
This project is licensed under the MIT License.
