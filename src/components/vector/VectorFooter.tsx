import React from 'react';

const VectorFooter = () => {
  return (
    <footer className="bg-deep-black border-t border-ash-gray/10 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left: Identity + Pedigree */}
        <div className="flex items-center gap-4">
          <img 
            src="/images/branding/logo_emblem.svg" 
            alt="Phoenix" 
            className="h-10 w-auto opacity-80" 
          />
          <div className="flex flex-col">
            <span className="text-blue-flame font-mono text-[10px] font-black tracking-widest uppercase">
              [VECTOR]
            </span>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash-gray font-bold">
              MS in Mathematics • Purdue University
            </p>
          </div>
        </div>

        {/* Center: Core Competencies */}
        <div className="flex gap-6 text-[10px] uppercase tracking-[0.3em] font-black text-blue-flame">
          <span>Architecture</span>
          <span className="text-ash-gray/30">•</span>
          <span>Automation</span>
          <span className="text-ash-gray/30">•</span>
          <span>Governance</span>
        </div>

        {/* Right: Legal + Location */}
        <div className="text-right flex flex-col gap-1">
          <p className="text-[10px] text-ash-gray font-medium tracking-widest uppercase">
            &copy; 2026 Studio Phoenix LLC. All Rights Reserved.
          </p>
          <p className="text-[9px] text-ash-gray/50 uppercase tracking-widest">
            Duluth, GA • Remote Systems Architecture
          </p>
        </div>
      </div>

      {/* Brutalist Partition Line */}
      <div className="max-w-6xl mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-ash-gray/20 to-transparent" />
    </footer>
  );
};

export default VectorFooter;