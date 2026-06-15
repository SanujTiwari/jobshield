import { useEffect, useState } from "react";
import { Shield, Sparkles } from "lucide-react";

function LoadingSpinner({ message }) {
  const [statusText, setStatusText] = useState(message || "Initializing JobShield AI...");

  const statusPhrases = [
    "Analyzing posting description...",
    "Scanning company name and domains...",
    "Calculating scam probability score...",
    "Running AI linguistic scan...",
    "Generating safety report...",
  ];

  useEffect(() => {
    if (message) {
      setStatusText(message);
      return;
    }
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statusPhrases.length;
      setStatusText(statusPhrases[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md transition-all duration-500 overflow-hidden">
      
      {/* Premium background light spheres */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2.5s' }} />
      
      {/* Container Box */}
      <div className="relative max-w-md w-full mx-4 p-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-center animate-scale-in">
        
        {/* 3D Holographic Scanner Stage */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8 overflow-visible" style={{ perspective: '1000px' }}>
          
          {/* Base Floor Light projection */}
          <div className="absolute bottom-6 w-36 h-8 bg-[#e98545]/10 rounded-full blur-md origin-center transform -rotate-x-90" />
          
          {/* Holographic Projection Cone */}
          <div className="absolute bottom-8 w-28 h-32 bg-gradient-to-t from-[#e98545]/15 to-transparent rounded-b-full blur-sm origin-bottom transform rotate-x-12" />

          {/* 3D Spinning Orbit Spheres */}
          <div className="absolute w-48 h-48 preserve-3d animate-spin-3d flex items-center justify-center">
            
            {/* Horizontal Ring */}
            <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-[#e98545]/40 shadow-[0_0_15px_rgba(233,133,69,0.15)] transform rotate-x-90 preserve-3d" />
            
            {/* Vertical Ring 1 */}
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#e3bc6a]/40 shadow-[0_0_15px_rgba(227,188,106,0.15)] transform rotate-y-90 preserve-3d" />
            
            {/* Diagonal Ring 2 */}
            <div className="absolute w-40 h-40 rounded-full border border-dashed border-[#e98545]/30 transform rotate-y-45 rotate-x-45 preserve-3d" />
            
            {/* Diagonal Ring 3 */}
            <div className="absolute w-40 h-40 rounded-full border border-dashed border-[#e3bc6a]/30 transform rotate-y-135 rotate-x-45 preserve-3d" />
            
          </div>

          {/* Central Holographic Shield Core */}
          <div className="relative z-10 w-24 h-24 animate-float flex items-center justify-center preserve-3d">
            
            {/* Inner Glow Sphere */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-[#e98545]/30 to-[#e3bc6a]/30 blur-md animate-pulse" />
            
            {/* Shield Icon with Gradient SVG */}
            <div className="relative w-16 h-16 flex items-center justify-center bg-slate-950/80 border border-[#e98545]/50 rounded-2xl shadow-[0_0_25px_rgba(233,133,69,0.4)] transform hover:scale-110 transition-transform">
              <svg className="w-10 h-10 drop-shadow-[0_0_8px_rgba(233,133,69,0.6)]" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e98545" />
                    <stop offset="100%" stopColor="#e3bc6a" />
                  </linearGradient>
                </defs>
                <path 
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                  stroke="url(#shield-grad)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#e3bc6a] animate-bounce" />
            </div>

            {/* Glowing Laser Scan sweeps over the shield */}
            <div className="absolute left-[-20px] right-[-20px] h-0.5 bg-gradient-to-r from-transparent via-[#e3bc6a] to-transparent shadow-[0_0_12px_#e3bc6a] animate-scan pointer-events-none" />

          </div>
          
        </div>

        {/* Brand Banner */}
        <div className="flex items-center gap-2 mb-3 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          <Shield className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">JobShield AI Scanning</span>
        </div>

        {/* Changing Loading Text */}
        <h3 className="text-xl font-bold text-slate-100 mb-2 min-h-[1.75rem] transition-all duration-300">
          {statusText}
        </h3>
        <p className="text-sm text-slate-400 max-w-xs mb-6">
          Analyzing formatting, employer verification patterns, and job verification metrics.
        </p>

        {/* Modern glowing progress bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-slate-700/50">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 rounded-full animate-pulse-glow" style={{
            width: '100%',
          }}>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[loading-bar-stripe_1s_linear_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
