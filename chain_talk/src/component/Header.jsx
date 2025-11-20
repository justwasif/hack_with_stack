import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    // const connectWallet = async () => {
    //     if (!window.ethereum) return alert("Install MetaMask!");
    //     try {
    //       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    //       const provider = new ethers.BrowserProvider(window.ethereum);
    //       const signer = await provider.getSigner();
    //       const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    //       setAccount(accounts[0]);
    //       setContract(_contract);
    //       setMessages(prev => [...prev, { from: "system", text: `✅ Connected: ${accounts[0].slice(0,6)}...${accounts[0].slice(-4)}` }]);
    //     } catch (error) {
    //       console.error(error);
    //       alert("Connection failed");
    //     }
    //   };
      
  const styles = `
    /* 🦊 Fox Glow Effect */
    .fox-glow {
      filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.5));
      transition: filter 0.3s ease;
    }
    .fox-glow:hover {
      filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8));
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
  `;

  return (
    <>
      <style>{styles}</style>

      <header className="glass-effect gradient-border sticky top-0 z-50 shadow-2xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 🦊 Logo + Text */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* MetaMask Fox (SVG) */}
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 200 200"
                  className="hover:scale-110 transition-transform cursor-pointer fox-glow"
                >
                  {/* Fox head */}
                  <path
                    d="M100 40 L140 80 L130 100 L140 120 L120 140 L100 130 L80 140 L60 120 L70 100 L60 80 Z"
                    fill="#8b5cf6"
                    stroke="#7c3aed"
                    strokeWidth="2"
                  />
                  {/* Inner face */}
                  <path
                    d="M100 60 L120 90 L110 110 L100 105 L90 110 L80 90 Z"
                    fill="#a78bfa"
                  />
                  {/* Eyes */}
                  <circle cx="85" cy="85" r="5" fill="#fff" />
                  <circle cx="115" cy="85" r="5" fill="#fff" />
                  <circle cx="87" cy="85" r="2.5" fill="#000" />
                  <circle cx="117" cy="85" r="2.5" fill="#000" />
                  {/* Ears */}
                  <path d="M60 80 L50 50 L70 70 Z" fill="#8b5cf6" />
                  <path d="M140 80 L150 50 L130 70 Z" fill="#8b5cf6" />
                  {/* Nose */}
                  <path d="M100 95 L95 105 L105 105 Z" fill="#000" />
                </svg>

                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
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

              {/* Connect Wallet button */}
              <button  className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 overflow-hidden">
                <span className="relative z-10"></span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}