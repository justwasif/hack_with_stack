import React, { useState, useEffect, useRef } from "react";
import { useWallet } from "../context/WalletContext";
import logo from "@assets/mylogo.png";
import chatbot from '@assets/chatobt.png';

// Get Groq API key from Vite environment variables
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const WIKI_URL = "wikipedia.org";

export default function Chatbot() {
  const { account, contract, connectWallet } = useWallet();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const fetchFromGroq = async (query) => {
    if (!GROQ_API_KEY) {
      throw new Error("Groq API key not found. Please check your .env file.");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{
          role: "user",
          content: `Search Wikipedia for: ${query}. Provide a concise answer with sources.`
        }],
        max_tokens: 500
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  };

  const sendTransaction = async (topic, dataSize) => {
    if (!contract) throw new Error("Contract not available. Make sure wallet is connected.");
    const siteData = await contract.sites(WIKI_URL);
    
    console.log("Checking site registration for:", WIKI_URL);
    console.log("Site data:", siteData);
    console.log("Is registered:", siteData.isRegistered);
    
    if (!siteData.isRegistered) {
      throw new Error(`Wikipedia not registered. Please register "${WIKI_URL}" first (exact URL match required).`);
    }

    const fee = BigInt(dataSize) * BigInt("100000000000000");
    const minFee = await contract.MIN_FEE();
    const payment = fee > minFee ? fee : minFee;

    const tx = await contract.fetchInfo(WIKI_URL, topic, dataSize, { value: payment });
    await tx.wait();
    return tx.hash;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!account) return alert("Connect wallet first!");

    setMessages(prev => [...prev, { from: "user", text: input }]);
    setLoading(true);

    try {
      const answer = await fetchFromGroq(input);
      const hasWikiContent = answer.toLowerCase().includes("wikipedia") && answer.length > 50;

      if (hasWikiContent) {
        try {
          const dataSize = Math.floor(answer.length / 10);
          const txHash = await sendTransaction(input, dataSize);
          setMessages(prev => [...prev, {
            from: "bot",
            text: `${answer}\n\n✅ Transaction confirmed: ${txHash.slice(0, 10)}...`
          }]);
        } catch (txErr) {
          console.error(txErr);
          setMessages(prev => [...prev, {
            from: "bot",
            text: `${answer}\n\n❌ Payment failed: ${txErr.message}`
          }]);
        }
      } else {
        setMessages(prev => [...prev, { from: "bot", text: answer }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { from: "bot", text: "❌ Error: " + error.message }]);
    }

    setLoading(false);
    setInput("");
  };

  const styles = `
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    
    @keyframes float { 
      0%, 100% { transform: translateY(0px); } 
      50% { transform: translateY(-10px); } 
    }
    
    @keyframes spin { 
      to { transform: rotate(360deg); } 
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
    
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .fade-in { animation: fadeIn 0.8s ease-out; }
    .float { animation: float 3s ease-in-out infinite; }
    .spin { animation: spin 1s linear infinite; }
    .glow-effect { animation: glow 2s ease-in-out infinite; }
    .slide-in-left { animation: slideIn 0.5s ease-out; }
    .slide-in-right { animation: slideInRight 0.5s ease-out; }
    .pulse-dot { animation: pulse 1.5s ease-in-out infinite; }
    .animate-pulseGlow { animation: pulseGlow 2s ease-in-out infinite; }

    .btn-hover { 
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
      position: relative;
      overflow: hidden;
    }
    
    .btn-hover::before {
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
    
    .btn-hover:hover:not(:disabled)::before {
      width: 300px;
      height: 300px;
    }
    
    .btn-hover:hover:not(:disabled) { 
      transform: scale(1.08) translateY(-2px); 
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.3);
    }
    
    .btn-hover:active:not(:disabled) {
      transform: scale(0.98);
    }
    
    .btn-hover:disabled { 
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

    .logo-image { 
      width: 60px; 
      height: 60px; 
      animation: float 3s ease-in-out infinite;
      filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
      border-radius: 12px;
    }
    
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
    
    .message-bubble {
      transition: all 0.3s ease;
    }
    
    .message-bubble:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .chat-container {
      background: rgba(17, 24, 39, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
  `;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>{styles}</style>

      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="wave-line" style={{top: '20%', animationDelay: '0s'}}></div>
        <div className="wave-line" style={{top: '40%', animationDelay: '1s'}}></div>
        <div className="wave-line" style={{top: '60%', animationDelay: '2s'}}></div>
        <div className="wave-line" style={{top: '80%', animationDelay: '3s'}}></div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black pointer-events-none"></div>

      <div className="flex flex-col items-center min-h-screen relative z-10 text-white p-4">
		<div className="flex items-center justify-center gap-6 mb-6">
			<img src={chatbot} alt="Chain Talk Logo" className="w-22 h-22 md:w-28 md:h-20 sm:w-20 sm:h-20"/>
			<h1 className="text-5xl md:text-4xl sm:text-3xl font-bold fade-in bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          		AI Chatbot
        	</h1>
		</div>
       
        <p className="text-gray-400 mb-8 fade-in text-lg">Positive Scraper 👁️‍🗨️</p>

						{/* Connect Wallet */}
						{/* {!account && (
						<button
							onClick={connectWallet}
							className="mb-8 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg btn-hover fade-in flex items-center justify-center gap-3 glow-effect"
						>
							{loading ? (
							<div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full spin"></div>
							) : (
							<>
								<span className="relative z-10">Connect Wallet</span>
							</>
							)}
						</button>
						)} */}

				{/* yaha vo ayega  */}

        <div
          ref={chatRef}
          className="w-full max-w-3xl chat-container rounded-3xl shadow-2xl p-6 h-[60vh] overflow-y-auto fade-in"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-4 p-4 rounded-2xl message-bubble ${
                msg.from === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 ml-auto max-w-[80%] slide-in-right"
                  : msg.from === "system"
                  ? "bg-gray-800/80 text-center text-sm border border-gray-700"
                  : "bg-gradient-to-r from-purple-600 to-purple-500 mr-auto max-w-[80%] slide-in-left"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 mt-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full pulse-dot"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full pulse-dot" style={{animationDelay:"0.3s"}}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full pulse-dot" style={{animationDelay:"0.6s"}}></div>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-3xl mt-8 gap-4 fade-in">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask anything :) ..."
            className="flex-1 p-5 rounded-2xl text-white border border-blue-500/30 input-glow transition-all text-lg"
          />
          <button
            onClick={handleSend}
            disabled={loading || !account}
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg btn-hover relative overflow-hidden"
          >
            <span className="relative z-10">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}