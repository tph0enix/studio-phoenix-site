'use client';

import { geistSans, inter, smashHit } from "../../app/fonts";
import Link from 'next/link';
import { PhoenixLogo } from '../../components/PhoenixLogo';

const VectorNavbar = () => {
  return (
    <nav className="border-b border-blue-flame p-6 pb-2 flex justify-between items-center bg-black sticky top-0 z-50">
      <div className="flex items-center gap-4">

        <Link href="/">
          <PhoenixLogo 
            src="/images/branding/logo_full_english.svg" 
            className="h-auto w-32 md:w-75"
          />
        </Link>

        <span className={`${geistSans.className} text-bright-white font-mono text-[10px] tracking-[0.5em] border-l border-blue-flame pl-4 uppercase`}>
          A world real-born
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
        <a href="#proof" className="text-bright-white hover:text-phoenix-orange transition-colors">Does it Work?</a>
        <a href="#services" className="text-bright-white hover:text-phoenix-orange transition-colors">What We Do</a>
        <a href="#about" className="text-bright-white hover:text-phoenix-orange transition-colors">About Us</a>
      </div>
    </nav>
  );
};

export default VectorNavbar;