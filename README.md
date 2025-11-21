# hack_with_stack
# 🦊 Chain_Talk

<div align="center">

![Chain_Talk Banner](https://img.shields.io/badge/Hack%20with%20Stack-Hackathon%202024-blueviolet?style=for-the-badge)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Solidity](https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black)

### *Decentralized Knowledge, Powered by AI & Blockchain* 🚀

**Built by Team Kabaadi** 🛠️

[Live Demo](#) • [Documentation](#features) • [Report Bug](#) • [Request Feature](#)

---

</div>

## 🌟 What is Chain_Talk?

Chain_Talk is a revolutionary **Web3-powered AI chatbot** that bridges the gap between traditional web scraping and decentralized compensation. We solve a critical problem: **content creators aren't fairly compensated when their data is scraped**.

Our platform leverages:
- 🔗 **Ethereum Smart Contracts** for transparent, immutable payment records
- 🤖 **Groq AI (LLaMA 3.3 70B)** for intelligent query processing
- 💰 **Automatic Micro-Payments** to registered content creators
- 📊 **On-Chain History** of all data fetches and payments

---

## 🎯 Problem Statement

In today's internet:
- Content creators lose revenue when AI bots scrape their websites
- No transparent record of who uses what data
- Zero compensation for valuable information extraction
- Trust issues between data consumers and providers

**Chain_Talk solves this with blockchain-verified payments and complete transparency.**

---

## ✨ Features

### 🔐 **Secure Site Registration**
- Register any website URL on the Ethereum blockchain
- Set your wallet address to receive scraping payments
- Immutable ownership records

### 🤖 **AI-Powered Chatbot**
- Ask questions about registered sites (currently supports Wikipedia)
- Get instant, intelligent responses using Groq's LLaMA 3.3 70B model
- Automatic payment processing when data is fetched

### 💎 **Smart Payment System**
- Dynamic fee calculation: `dataSize * 0.0001 ETH` (minimum 0.001 ETH)
- Instant payments to content creators
- All transactions recorded on-chain

### 📜 **Complete Transaction History**
- View all past queries and payments
- Track data volume scraped
- Transparent blockchain verification
- Beautiful, animated UI cards for each record

### 🎨 **Stunning UI/UX**
- Glassmorphism design with backdrop blur effects
- Smooth animations and transitions
- Gradient color schemes
- Responsive mobile-first design
- Dark mode optimized

---

## 🛠️ Tech Stack

<div align="center">

| **Frontend** | **Smart Contracts** | **AI/APIs** | **Tools** |
|:------------:|:------------------:|:-----------:|:---------:|
| React 18 | Solidity ^0.8.20 | Groq AI | Vite |
| TailwindCSS | Ethers.js v6 | LLaMA 3.3 70B | MetaMask |
| React Router | Hardhat/Remix | - | Git |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│  (React + TailwindCSS + Glassmorphism Design)               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    WalletContext Provider                    │
│         (MetaMask Connection + Contract Instance)           │
└────────┬──────────────────────────────────┬─────────────────┘
         │                                   │
         ▼                                   ▼
┌─────────────────────┐          ┌──────────────────────────┐
│   Ethereum Blockchain│          │      Groq AI API         │
│   (Smart Contract)   │          │   (LLaMA 3.3 70B)       │
│                      │          │                          │
│ • registerSite()     │          │ • Query Processing       │
│ • fetchInfo()        │          │ • Natural Language       │
│ • getFetchHistory()  │          │ • Wikipedia Search       │
└──────────────────────┘          └──────────────────────────┘
```

---

## 📋 Smart Contract Functions

### `registerSite(string _url)`
Register a website to receive payments when data is scraped.

### `fetchInfo(string _siteUrl, string _topic, uint256 dataScraped)`
Called when chatbot fetches data. Automatically pays the site owner.

### `getFetchHistory(string _siteUrl)`
Retrieve complete transaction history for a registered site.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MetaMask browser extension
- Ethereum testnet ETH (Sepolia/Goerli)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-team/chain_talk.git
cd chain_talk
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4. **Update contract address**
```javascript
// src/contract.js
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
export const CONTRACT_ABI = [...]; // Your ABI here
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:5173
```

---

## 🎮 Usage Guide

### Step 1: Connect Your Wallet
Click the **"Connect Wallet"** button in the header to connect MetaMask.

### Step 2: Register a Site
1. Navigate to **"Register Site"**
2. Enter the site URL (e.g., `wikipedia.org`)
3. Click **"Register Site"** and confirm the transaction
4. Wait for blockchain confirmation ✅

### Step 3: Use the Chatbot
1. Go to **"Chatbot"** page
2. Ask any question (e.g., "Tell me about quantum computing")
3. The AI will search Wikipedia and automatically:
   - Process your query
   - Fetch relevant data
   - Pay the site owner
   - Display results with transaction hash

### Step 4: View History
Check the **"History"** page to see all past transactions, payments, and data volumes.

---

## 💡 Use Cases

- 📚 **Academic Research**: Pay researchers directly when citing their work
- 📰 **News Aggregation**: Compensate journalists for content extraction
- 🛒 **E-commerce**: Reward product database owners for price comparisons
- 🎓 **Educational Platforms**: Fair payment for course material usage
- 🔬 **Scientific Databases**: Transparent attribution and compensation

---

## 🌈 UI Highlights

### Dynamic Animations
- ✨ Floating particles background
- 🌊 Flowing wave lines
- 💫 Glow effects on interactive elements
- 🎭 Smooth card hover transitions

### Glassmorphism Design
```css
background: rgba(17, 24, 39, 0.6);
backdrop-filter: blur(20px);
border: 1px solid rgba(59, 130, 246, 0.2);
```

### Color Palette
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Accent: Pink (#EC4899)
- Dark: Black with gradient overlays

---

## 🏆 Team Kabaadi

<div align="center">

| Member | Role | GitHub |
|:------:|:----:|:------:|
| **Member 1** | Frontend + Smart Contracts | [@member1](#) |
| **Member 2** | UI/UX + Integration | [@member2](#) |
| **Member 3** | AI + Backend Logic | [@member3](#) |

</div>

---

## 🔮 Future Roadmap

- [ ] Multi-chain support (Polygon, Arbitrum, Optimism)
- [ ] Support for more data sources beyond Wikipedia
- [ ] AI model fine-tuning for better responses
- [ ] Mobile app (React Native)
- [ ] Content creator analytics dashboard
- [ ] NFT certificates for data contributions
- [ ] DAO governance for platform decisions
- [ ] Integration with IPFS for decentralized storage

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hack with Stack** for organizing this amazing hackathon
- **Groq** for providing cutting-edge AI inference
- **Ethereum Foundation** for the robust blockchain infrastructure
- **OpenZeppelin** for secure smart contract libraries
- The open-source community for incredible tools and support

---

## 📞 Contact & Support

- 🌐 **Website**: [chain-talk.xyz](#)
- 📧 **Email**: team.kabaadi@example.com
- 💬 **Discord**: [Join our community](#)
- 🐦 **Twitter**: [@ChainTalk](#)

---

<div align="center">

### ⭐ Star us on GitHub — it helps!

**Made with 💜 by Team Kabaadi**

*Hack with Stack Hackathon 2024*

</div>

---

## 📸 Screenshots

### Home Page
Beautiful landing with animated background and clear call-to-action buttons.

### Chatbot Interface
Ask questions and get AI-powered responses with automatic blockchain payments.

### Transaction History
View all past queries with beautiful gradient cards showing payment details.

### Site Registration
Simple, intuitive interface to register websites and start earning.

---

## 🔧 Troubleshooting

**MetaMask not connecting?**
- Make sure you're on the correct network (Sepolia/Goerli)
- Try refreshing the page
- Clear browser cache

**Transactions failing?**
- Ensure you have enough ETH for gas fees
- Check if the site is registered
- Verify contract address is correct

**AI not responding?**
- Check if GROQ_API_KEY is set correctly
- Verify API rate limits
- Check console for errors

---

<div align="center">

**🚀 Built on Ethereum | 🤖 Powered by Groq AI | 💎 Crafted with React**

</div>
