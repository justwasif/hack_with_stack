import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const CONTRACT_ABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dataScraped",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			}
		],
		"name": "DataScraped",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_siteUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dataScraped",
				"type": "uint256"
			}
		],
		"name": "fetchInfo",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "site",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "InfoFetched",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dataAmount",
				"type": "uint256"
			}
		],
		"name": "logScrapedData",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			}
		],
		"name": "registerSite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "SiteRegistered",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "chatbotOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "fetchHistory",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dataScraped",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_siteUrl",
				"type": "string"
			}
		],
		"name": "getFetchHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountPaid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dataScraped",
						"type": "uint256"
					}
				],
				"internalType": "struct InfoAccessV3.FetchRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "sites",
		"outputs": [
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "totalEarned",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalDataScraped",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const CONTRACT_ADDRESS = "0x270D811e692DCD363Bf604e324351645Fb6D9C05";

export default function RegisterSite() {
  const [url, setUrl] = useState("");
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setConnected(false);
          setWalletAddress("");
          setContract(null);
        }
      });
    }
  }, []);

  async function connect() {
    if (!window.ethereum) return alert("Install MetaMask first!");
    setLoading(true);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const acc = accounts[0];

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setContract(_contract);
      setConnected(true);
      setWalletAddress(acc);
      setStatus("✅ Connected to MetaMask");
    } catch (err) {
      setStatus("❌ Connection failed: " + err.message);
    }
    setLoading(false);
  }

  async function register() {
    if (!url.trim() || !contract) return;
    setLoading(true);
    try {
      const tx = await contract.registerSite(url);
      setStatus("⏳ Transaction sent: " + tx.hash);
      await tx.wait();
      setStatus("✅ Site registered successfully! Tx: " + tx.hash);
    } catch (err) {
      setStatus("❌ Error: " + (err.message || err));
    }
    setLoading(false);
  }

  async function checkSite() {
    if (!url.trim() || !contract) return;
    setLoading(true);
    try {
      const siteData = await contract.sites(url);
      setStatus(siteData.isRegistered ? "✅ Site is already registered!" : "⚠️ Site not registered yet.");
    } catch (err) {
      setStatus("❌ Error: " + err.message);
    }
    setLoading(false);
  }

  const styles = `
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    
    @keyframes float { 
      0%, 100% { transform: translateY(0px); } 
      50% { transform: translateY(-15px); } 
    }
    
    @keyframes waveFlow {
      0% { transform: translateX(-100%) scaleY(1); }
      50% { transform: translateX(0%) scaleY(1.2); }
      100% { transform: translateX(100%) scaleY(1); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.5); }
    }
    
    @keyframes blink { 
      0%, 20%, 40%, 60%, 80%, 100% { r: 2.5; } 
      10%, 30%, 50%, 70%, 90% { r: 0.5; } 
    }
    
    @keyframes earTwitch { 
      0%, 100% { transform: rotate(0deg); } 
      50% { transform: rotate(-10deg); } 
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    .fade-in { animation: fadeIn 0.8s ease-out; }
    .float { animation: float 3s ease-in-out infinite; }
    .glow-effect { animation: glow 2s ease-in-out infinite; }
    .pulse-effect { animation: pulse 2s ease-in-out infinite; }
    
    .btn { 
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
      position: relative;
      overflow: hidden;
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    .btn:hover:not(:disabled)::before {
      width: 300px;
      height: 300px;
    }
    
    .btn:hover:not(:disabled) { 
      transform: scale(1.08) translateY(-2px); 
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.3);
    }
    
    .btn:active:not(:disabled) {
      transform: scale(0.98);
    }
    
    .btn:disabled { 
      opacity: 0.5; 
      cursor: not-allowed; 
    }

    .input-glow { 
      transition: all 0.3s ease;
      background: rgba(17, 24, 39, 0.5);
      backdrop-filter: blur(10px);
    }
    
    .input-glow:focus { 
      outline: none; 
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
      border-color: #3b82f6;
      background: rgba(17, 24, 39, 0.7);
    }

    .fox-connected { animation: float 3s ease-in-out infinite; }
    .fox-eye-left { animation: blink 3s infinite; transform-origin: center; }
    .fox-eye-right { animation: blink 3s infinite 1.5s; transform-origin: center; }
    .fox-ear-left { animation: earTwitch 2s infinite; transform-origin: bottom center; }
    .fox-ear-right { animation: earTwitch 2s infinite 1s; transform-origin: bottom center; }
    
    .wave-line {
      position: absolute;
      width: 200%;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(59, 130, 246, 0.8), 
        rgba(139, 92, 246, 0.8), 
        transparent
      );
      animation: waveFlow 4s linear infinite;
    }
    
    .card-glass {
      background: rgba(17, 24, 39, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    
    .shimmer-text {
      background: linear-gradient(90deg, #60a5fa, #a78bfa, #ec4899, #60a5fa);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-black relative overflow-hidden">
        
        {/* Animated background waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="wave-line" style={{top: '20%', animationDelay: '0s'}}></div>
          <div className="wave-line" style={{top: '40%', animationDelay: '1s'}}></div>
          <div className="wave-line" style={{top: '60%', animationDelay: '2s'}}></div>
          <div className="wave-line" style={{top: '80%', animationDelay: '3s'}}></div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto py-12 px-4 relative z-10">

          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <div className="flex justify-center mb-6">
              <svg width="100" height="100" viewBox="0 0 200 200" className={connected ? "fox-connected" : "float"} style={{filter: 'drop-shadow(0 0 20px rgba(246, 133, 27, 0.6))'}}>
                <path d="M100 40 L140 80 L130 100 L140 120 L120 140 L100 130 L80 140 L60 120 L70 100 L60 80 Z" fill="#F6851B" stroke="#E2761B" strokeWidth="2" />
                <path d="M100 60 L120 90 L110 110 L100 105 L90 110 L80 90 Z" fill="#E4761B" />
                <circle className="fox-eye-left" cx="85" cy="85" r="2.5" fill="#000" />
                <circle className="fox-eye-right" cx="115" cy="85" r="2.5" fill="#000" />
                <circle cx="85" cy="85" r="5" fill="#fff" />
                <circle cx="115" cy="85" r="5" fill="#fff" />
                <path className="fox-ear-left" d="M60 80 L50 50 L70 70 Z" fill="#F6851B" />
                <path className="fox-ear-right" d="M140 80 L150 50 L130 70 Z" fill="#F6851B" />
                <path d="M100 95 L95 105 L105 105 Z" fill="#000" />
              </svg>
            </div>
            <h1 className="text-6xl font-bold mb-4 shimmer-text">Register Your Site</h1>
            <p className="text-xl text-gray-400">Secure your site on the Ethereum blockchain 🌐</p>
          </div>

          {/* Connection Card */}
          <div className="card-glass rounded-3xl shadow-2xl p-8 fade-in mb-10">
            {!connected ? (
              <div className="text-center">
                <p className="text-gray-300 mb-6 text-lg">Connect your MetaMask wallet to begin</p>
                <button
                  onClick={connect}
                  disabled={loading}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg btn glow-effect relative overflow-hidden"
                >
                  <span className="relative z-10">{loading ? "Connecting..." : "Connect MetaMask"}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-gradient-to-r from-green-900/40 to-emerald-900/40 p-6 rounded-2xl border-2 border-green-500/30 fade-in backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <svg width="60" height="60" viewBox="0 0 200 200" className="fox-connected" style={{filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))'}}>
                    <path d="M100 40 L140 80 L130 100 L140 120 L120 140 L100 130 L80 140 L60 120 L70 100 L60 80 Z" fill="#F6851B" stroke="#E2761B" strokeWidth="2" />
                    <path d="M100 60 L120 90 L110 110 L100 105 L90 110 L80 90 Z" fill="#E4761B" />
                    <circle className="fox-eye-left" cx="85" cy="85" r="2.5" fill="#000" />
                    <circle className="fox-eye-right" cx="115" cy="85" r="2.5" fill="#000" />
                    <circle cx="85" cy="85" r="5" fill="#fff" />
                    <circle cx="115" cy="85" r="5" fill="#fff" />
                    <path className="fox-ear-left" d="M60 80 L50 50 L70 70 Z" fill="#F6851B" />
                    <path className="fox-ear-right" d="M140 80 L150 50 L130 70 Z" fill="#F6851B" />
                    <path d="M100 95 L95 105 L105 105 Z" fill="#000" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold">Connected Wallet</p>
                    <p className="text-lg font-mono font-bold text-green-400">{walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-400 font-bold text-lg pulse-effect">✅ Connected</div>
              </div>
            )}
          </div>

          {/* Action Card */}
          {connected && (
            <div className="card-glass rounded-3xl shadow-2xl p-8 fade-in">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-6 py-4 border-2 border-blue-500/30 rounded-2xl text-lg text-white input-glow mb-6 placeholder-gray-500"
              />
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={register} 
                  disabled={!connected || loading || !url.trim()} 
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-semibold text-lg btn relative overflow-hidden"
                >
                  <span className="relative z-10">Register Site</span>
                </button>
                <button 
                  onClick={checkSite} 
                  disabled={!connected || loading || !url.trim()} 
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-semibold text-lg btn relative overflow-hidden"
                >
                  <span className="relative z-10">Check Site</span>
                </button>
              </div>
              {status && (
                <div className="p-4 rounded-xl bg-gray-800/50 border border-blue-500/30 text-gray-200 backdrop-blur-sm fade-in">
                  {status}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}