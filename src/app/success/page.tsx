'use client';

import Link from 'next/link';
import { PhoenixLogo } from '@/components/PhoenixLogo';
import { Suspense, useEffect } from 'react';

function SuccessPageContent() {

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('payment_intent_client_secret');
    url.searchParams.delete('payment_intent');
    url.searchParams.delete('redirect_status');
    window.history.replaceState({}, '', url.toString());
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-4 py-6">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md -z-0" />
      <div className="bg-[#0D0D0D] border border-phoenix-orange/20 max-w-lg w-full p-8 md:p-10 relative shadow-[0_0_80px_rgba(255,102,0,0.05)] my-auto z-10">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <PhoenixLogo 
            src="/images/branding/logo_full_english.svg" 
            className="h-auto w-24 md:w-32"
          />
        </div>

        {/* Header */}
        <div className="mb-8 border-l-2 border-[#13A940] pl-5">
          <h1 className="text-3xl font-inter font-black text-white uppercase tracking-tighter leading-none">
            Session Secured
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-6">

          <p className="text-white text-2xl font-inter font-black uppercase tracking-tight leading-tight">
            Your data's future: <span className="text-phoenix-orange">relit</span>
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Your discovery call is confirmed and your $250 deposit is in. Your spreadsheets don't know what's coming. <br/><br/>Check your email and calendar for your session details — see you soon!
          </p>

          {/* Return Link */}
          <div className="pt-4 border-t border-white/5">
            <Link 
              href="https://vector.studiophoenix.ink"
              className="w-full block text-center border border-white/10 text-white font-inter font-bold text-xs uppercase tracking-[0.4em] py-3 hover:border-phoenix-orange hover:text-phoenix-orange transition-all duration-300"
            >
              Return Home
            </Link>
          </div>

        </div>

        {/* Background Grid */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] -z-10"></div>

      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-widest">
        Initializing...
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
