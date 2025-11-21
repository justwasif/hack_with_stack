import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import logo from "@assets/mylogo.png";

const SITE_URL = "wikipedia.org";

export default function History() {
  const { contract, isConnected, connectWallet } = useWallet();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    if (!contract) {
      setLoading(false);
      return;
    }

    try {
      const history = await contract.getFetchHistory(SITE_URL);

      const formatted = history.map((r) => {
        const dataBytes = Number(r.dataScraped?.toString() || 0);
        const dataKB = (dataBytes / 1024).toFixed(2);
        const ethAmount = ethers.formatEther(r.amountPaid || 0);

        return {
          user: r.user,
          topic: r.topic || "(no topic)",
          dataAmount: dataKB,
          amount: Number(ethAmount).toFixed(6),
          time: new Date(Number(r.timestamp?.toString() || 0) * 1000).toLocaleString(),
        };
      });

      setRecords(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error loading history:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && contract) {
      loadHistory();
    } else {
      setLoading(false);
    }
  }, [isConnected, contract]);

  const vibrantColors = [
    'from-pink-500 to-fuchsia-600',
    'from-purple-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-fuchsia-500 to-pink-600',
    'from-indigo-500 to-blue-600',
    'from-purple-600 to-fuchsia-600',
  ];

  const styles = `
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    @keyframes spin { 
      to { transform: rotate(360deg); } 
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
      50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
    }
    .fade-in { 
      animation: fadeIn 0.6s ease-out; 
    }
    .history-card { 
      transition: all 0.3s ease; 
      animation: fadeIn 0.6s ease-out; 
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(139, 92, 246, 0.2);
    }
    .history-card:hover { 
      transform: translateY(-8px) scale(1.01); 
      box-shadow: 0 25px 50px rgba(139, 92, 246, 0.3);
      border-color: rgba(139, 92, 246, 0.5);
    }
    .stat-card {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(139, 92, 246, 0.3);
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      border-color: rgba(139, 92, 246, 0.6);
      transform: translateY(-2px);
    }
    .badge { 
      display: inline-block; 
      padding: 0.375rem 1rem; 
      border-radius: 9999px; 
      font-size: 0.75rem; 
      font-weight: 600;
    }
    .glow-text {
      text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    }
    .spinner {
      animation: spin 1s linear infinite;
      border-color: #a855f7;
      border-top-color: transparent;
    }
    .btn-connect {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }
    .btn-connect::before {
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
    .btn-connect:hover::before {
      width: 300px;
      height: 300px;
    }
    .btn-connect:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-12 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <h1 className="text-6xl font-bold text-white mb-3 glow-text">
              Fetch History
            </h1>
            
            <img
              src={logo}
              alt="Chain Talk Logo"
                        className="w-48 h-48 md:w-36 md:h-36 sm:w-24 sm:h-24"
            />
            
            
                     
            
        </div>
        <div className="flex items-center justify-center gap-4 mb-3">
          <p className="text-xl text-purple-200">Browse all blockchain-recorded Wikipedia queries</p>
        </div>

          {/* Not Connected State */}
          {!isConnected ? (
            <div className="bg-slate-900 bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-500 border-opacity-30 p-12 text-center fade-in">
              <div className="text-7xl mb-6">🔒</div>
              <h3 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-purple-200 text-lg mb-8">Please connect your wallet to view transaction history</p>
              <button
                onClick={connectWallet}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg btn-connect relative overflow-hidden"
              >
                <span className="relative z-10">Connect Wallet</span>
              </button>
            </div>
          ) : loading ? (
            <div className="bg-slate-900 bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-500 border-opacity-30 p-12 text-center fade-in">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 border-4 rounded-full spinner"></div>
              </div>
              <p className="text-xl text-purple-200 font-semibold">Loading history from blockchain...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="bg-slate-900 bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-500 border-opacity-30 p-12 text-center fade-in">
              <div className="text-7xl mb-4">📭</div>
              <h3 className="text-3xl font-bold text-white mb-2">No Transactions Yet</h3>
              <p className="text-purple-200 text-lg">Start using the chatbot to see your history here!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {records.map((r, i) => {
                const colorClass = vibrantColors[i % vibrantColors.length];
                return (
                  <div
                    key={i}
                    className="history-card rounded-3xl overflow-hidden"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${colorClass}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                              #{i + 1}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">{r.topic}</h3>
                              <p className="text-sm text-purple-300 font-mono mt-1">
                                {r.user.slice(0, 10)}...{r.user.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className={`badge bg-gradient-to-r ${colorClass} text-white shadow-lg`}>
                          Query #{i + 1}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="stat-card p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">💾</span>
                            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                              Data Scraped
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-cyan-400">{r.dataAmount} KB</p>
                        </div>
                        
                        <div className="stat-card p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">💰</span>
                            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                              Amount Paid
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-fuchsia-400">{r.amount} ETH</p>
                        </div>
                        
                        <div className="stat-card p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🕐</span>
                            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                              Timestamp
                            </p>
                          </div>
                          <p className="text-sm font-bold text-purple-400">{r.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-purple-800 border-opacity-50">
                        <svg width="20" height="20" viewBox="0 0 256 417">
                          <path fill="#8B5CF6" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
                          <path fill="#A78BFA" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
                        </svg>
                        <p className="text-sm text-purple-300 font-semibold">
                          Recorded on Ethereum Blockchain
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}