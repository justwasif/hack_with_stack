import React, { useState, useEffect } from "react";

export default function Home() {
  const [floatOffset, setFloatOffset] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatOffset(prev => (prev + 1) % 360);
    }, 50);

    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    return () => clearInterval(interval);
  }, []);

  const floatY = Math.sin(floatOffset * 0.05) * 20;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-10px, -30px); }
          75% { transform: translate(5px, -15px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)); }
          50% { filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.9)); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes waveFlow {
          0% { transform: translateX(-100%) scaleY(1); }
          50% { transform: translateX(0%) scaleY(1.2); }
          100% { transform: translateX(100%) scaleY(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
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
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        .fade-in-delayed {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        .scale-in {
          animation: scaleIn 0.8s ease-out;
        }
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
        .btn-hover:hover::before {
          width: 400px;
          height: 400px;
        }
        .btn-hover:hover {
          transform: scale(1.08) translateY(-3px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.3);
        }
        .card-hover {
          transition: all 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-10px);
        }
        .shimmer-text {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #ec4899, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="wave-line" style={{top: '15%', animationDelay: '0s'}}></div>
        <div className="wave-line" style={{top: '35%', animationDelay: '1s'}}></div>
        <div className="wave-line" style={{top: '55%', animationDelay: '2s'}}></div>
        <div className="wave-line" style={{top: '75%', animationDelay: '3s'}}></div>
      </div>

      {/* Animated flowing lines background */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map(i => (
          <path
            key={i}
            d={`M 0 ${200 + i * 80} Q 400 ${150 + i * 80 + Math.sin(floatOffset * 0.05 + i) * 50} 800 ${200 + i * 80} T 1600 ${200 + i * 80}`}
            stroke={i % 2 === 0 ? "url(#gradient1)" : "url(#gradient2)"}
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        ))}
      </svg>
      
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.id % 3 === 0 ? 'rgba(59, 130, 246, 0.4)' : 
                       particle.id % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(236, 72, 153, 0.4)',
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 20px currentColor',
            zIndex: 1
          }}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Hero Content */}
        <div className="text-center space-y-12 pt-20">
          <h1 className="text-7xl font-bold text-white tracking-tight fade-in">
            Get Started with <span className="shimmer-text">Chain_Talk</span>
          </h1>

          {/* Spacer for scroll */}
          <div className="h-20"></div>

          <div className="text-center space-y-8 fade-in-delayed">
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Dive into the world of decentralized knowledge. Our platform lets you register websites, fetch data securely on-chain, 
              and get AI-powered insights from your favorite sources — all powered by Ethereum.
            </p>

            {/* Ethereum Badge */}
            <div className="flex items-center justify-center gap-3 text-gray-300 mt-8 scale-in">
              <svg width="35" height="35" viewBox="0 0 256 417" className="inline-block opacity-80" style={{filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.5))'}}>
                <path fill="#8C8C8C" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
                <path fill="#C0C0C0" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
                <path fill="#8C8C8C" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/>
                <path fill="#C0C0C0" d="M127.962 416.905v-104.72L0 236.585z"/>
                <path fill="#5C5C5C" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/>
                <path fill="#A0A0A0" d="M0 212.32l127.96 75.638v-133.8z"/>
              </svg>
              <span className="text-lg font-medium">Powered by Ethereum</span>
            </div>

            {/* Secondary CTA */}
            <div className="flex gap-6 justify-center mt-12 scale-in">
                <button className="px-10 py-5 bg-transparent text-blue-400 border-2 border-blue-500 rounded-full font-semibold text-lg btn-hover relative overflow-hidden">
                  <span className="relative z-10">Try Chatbot</span>
                </button>
                <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg btn-hover relative overflow-hidden">
                  <span className="relative z-10">Take me to the Magic Canvas</span>
                </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-blue-500/30 p-8 rounded-3xl card-hover group fade-in" style={{animationDelay: '0.4s'}}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform" style={{filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))'}}>🔒</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Secure</h3>
                <p className="text-gray-400 leading-relaxed">Register sites and store fetch data safely on-chain with cryptographic verification.</p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-purple-500/30 p-8 rounded-3xl card-hover group fade-in" style={{animationDelay: '0.5s'}}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform" style={{filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.5))'}}>⚡</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Efficient</h3>
                <p className="text-gray-400 leading-relaxed">Quickly fetch and log data while compensating content creators fairly.</p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-pink-500/30 p-8 rounded-3xl card-hover group fade-in" style={{animationDelay: '0.6s'}}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform" style={{filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.5))'}}>🤖</div>
                <h3 className="text-2xl font-bold mb-3 text-white">AI-Enhanced</h3>
                <p className="text-gray-400 leading-relaxed">Get intelligent summaries and deep insights from scraped data using advanced AI.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}