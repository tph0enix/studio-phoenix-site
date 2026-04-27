'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('phoenix_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('phoenix_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('phoenix_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50">
      <div className="bg-[#0D0D0D] border border-white/10 p-6 shadow-2xl relative overflow-hidden">
        {/* Phoenix Accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-phoenix-orange"></div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-phoenix-orange text-[9px] font-black tracking-[0.3em] uppercase">
              System_Notice / Privacy
            </p>
            <h2 className="text-white text-xs font-bold uppercase tracking-tight">
              Cookie Initialization
            </h2>
          </div>

          <p className="text-white/50 text-[11px] leading-relaxed font-mono">
            We use cookies to optimize the Vector diagnostic terminal and analyze traffic patterns. No personal data is extracted without authorization.
          </p>

          <div className="flex gap-4 pt-2">
            <button 
              onClick={acceptCookies}
              className="flex-1 bg-white text-black text-[10px] font-black py-2 uppercase tracking-widest hover:bg-phoenix-orange transition-colors"
            >
              Accept
            </button>
            <button 
              onClick={declineCookies}
              className="flex-1 border border-white/10 text-white/40 text-[10px] font-black py-2 uppercase tracking-widest hover:text-white hover:border-white transition-all"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}