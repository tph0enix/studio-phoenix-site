import React from 'react';
import Link from 'next/link';
import { PhoenixLogo } from '../../components/PhoenixLogo';

const VectorFooter = () => {
  return (
    <footer className="bg-deep-black border-t border-ash-gray/10 px-6 font-sans">
      {/* Top Disclaimer: Tightened and Integrated */}
      <div className="max-w-6xl mx-auto pt-4">
        <p className="text-[9px] font-inter font-light text-ash-gray tracking-tight text-right italic">
          * based on our performance averages & work availability. Not every case is typical. Inquire for further details.
        </p>
      </div>

      <div className="py-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-10">
        
        {/* Left: Identity + Primary Metadata */}
        <div className="flex items-center gap-5">
          <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
            <PhoenixLogo 
              src="/images/branding/logo_emblem.svg" 
              className="h-12 w-12"
            />
          </Link>

          <div className="flex flex-col border-l border-white/5 pl-5">
            <div className="flex items-center gap-3">
              <span className="text-blue-flame font-mono text-xs font-black tracking-[0.3em] uppercase">
                [VECTOR]
              </span>
              <span className="text-[10px] text-ash-gray font-medium tracking-widest uppercase opacity-60">
                &copy; 2026 Studio Phoenix
              </span>
            </div>
            <p className="text-[9px] text-ash-gray/40 uppercase tracking-[0.25em] mt-1 font-bold">
              Website designed & hand-coded with love by Studio Phoenix.
            </p>
          </div>
        </div>

        {/* Right: Legal, SEO & System Navigation */}
        <div className="flex flex-wrap justify-end gap-x-8 gap-y-3">
          <Link href="/privacy" className="text-[10px] text-ash-gray hover:text-blue-flame transition-colors tracking-widest">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-[10px] text-ash-gray hover:text-blue-flame transition-colors tracking-widest">
            Terms of Service
          </Link>
          <Link href="/sitemap.xml" className="text-[10px] text-ash-gray hover:text-blue-flame transition-colors tracking-widest">
            Sitemap
          </Link>
          <Link href="/cookies" className="text-[10px] text-ash-gray hover:text-blue-flame transition-colors tracking-widest">
            Cookie Settings
          </Link>
        </div>
      </div>

      {/* Brutalist Partition Line - Bottom */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-flame/20 to-transparent" />
      
      {/* Hidden SEO Keywords for Crawler Optimization (Not visible to users) */}
      <div className="sr-only">
        Data Engineering, Business Process Automation, Database Infrastructure Design, Studio Phoenix, Governance, Report Performance, Dataflow, ETL Process, Reporting Training.
      </div>
    </footer>
  );
};

export default VectorFooter;