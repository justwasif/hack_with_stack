import React from "react";
import { NavLink } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import logo from "@assets/mylogo.png";

export default function Header() {
  const { account, isConnected, connectWallet, disconnectWallet } = useWallet();

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const styles = `
    /* Logo Glow Effect */
    .logo-glow {
      filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.5));
      transition: filter 0.3s ease, transform 0.3s ease;
    }
    .logo-glow:hover {
      filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8));
      transform: scale(1.1);
    }

    /* 🔗 Navigation Links */
    .nav-link {
      padding: 0.625rem 1.25rem;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      color: #9ca3af;
      text-decoration: none;
      display: inline-block;
      position: relative;
    }
    .nav-link:hover {
      color: #ffffff;
      transform: translateY(-2px);
    }
    .nav-link::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    .nav-link:hover::before {
      width: 80%;
    }
    .nav-link.active {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
      color: #ffffff;
      border: 1px solid rgba(139, 92, 246, 0.3);
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    }

    /* Glassmorphism effect */
    .glass-effect {
      background: rgba(17, 24, 39, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    /* Gradient border animation */
    @keyframes border-flow {
      0%, 100% { 
        border-image-source: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      }
      50% { 
        border-image-source: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6);
      }
    }

    .gradient-border {
      border-bottom: 2px solid;
      border-image-slice: 1;
      border-image-source: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      animation: border-flow 3s ease infinite;
    }

    .wallet-btn {
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .wallet-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transform: translate(-50%, -50%);
      transition: width 0.4s, height 0.4s;
    }
    
    .wallet-btn:hover::before {
      width: 300px;
      height: 300px;
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <header className="glass-effect gradient-border sticky top-0 z-50 shadow-2xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 🎨 Logo + Text */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Chain Talk Logo" 
                  width="50" 
                  height="50"
                  className="logo-glow cursor-pointer rounded-lg"
                />

                {/* Online indicator */}
                {isConnected && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                )}
              </div>

              {/* Chain_Talk Text */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Chain_Talk
                </h1>
                <p className="text-xs text-gray-500">Grok Powered</p>
              </div>
            </div>

            {/* 🌐 Navigation */}
            <ul className="flex items-center gap-2">
              <li>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/chatbot" className="nav-link">
                  Chatbot
                </NavLink>
              </li>
              <li>
                <NavLink to="/registersite" className="nav-link">
                  Register Site
                </NavLink>
              </li>
              <li>
                <NavLink to="/history" className="nav-link">
                  History
                </NavLink>
              </li>
            </ul>

            {/* 💎 Ethereum + Button */}
            <div className="flex items-center gap-4">
              {/* Ethereum badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-gray-700 hover:border-purple-500 transition-all">
                <svg width="20" height="20" viewBox="0 0 256 417">
                  <path
                    fill="#8C8C8C"
                    d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                  />
                  <path
                    fill="#C0C0C0"
                    d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                  />
                  <path
                    fill="#8C8C8C"
                    d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                  />
                  <path
                    fill="#C0C0C0"
                    d="M127.962 416.905v-104.72L0 236.585z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-300">
                  Ethereum
                </span>
              </div>

              {/* Connect/Disconnect Wallet button */}
              <button 
                onClick={handleWalletAction}
                className="wallet-btn group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">
                  {isConnected 
                    ? `${account.slice(0, 6)}...${account.slice(-4)}` 
                    : "Connect Wallet"
                  }
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}