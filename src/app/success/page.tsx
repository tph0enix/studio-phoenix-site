'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PhoenixLogo } from '@/components/PhoenixLogo';
import { Suspense } from 'react'; // 1. Import Suspense

// 2. Move the UI logic into a separate internal component
function SuccessPageContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  return (
    <main className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6 font-mono">
      {/* Branding Header */}
      <div className="mb-12 opacity-50">
        <PhoenixLogo 
          src="/images/branding/logo_full_english.svg" 
          className="h-auto w-24"
        />
      </div>

      <div className="max-w-md w-full border border-white/10 bg-white/[0.02] p-8 md:p-12 relative overflow-hidden">
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-phoenix-orange"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-phoenix-orange"></div>

        <div className="space-y-8">
          {/* Header Status */}
          <div className="border-l-2 border-[#13A940] pl-5 space-y-1">
            <p className="text-[#13A940] text-[9px] font-black tracking-[0.4em] uppercase">
              Phase 04 / Finalized
            </p>
            <h1 className="text-2xl font-inter font-black text-white uppercase tracking-tighter">
              Roadmap Secured
            </h1>
          </div>

          {/* System Report Content */}
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-white/70">
              The diagnostic deposit has been successfully authorized and the transmission is complete.
            </p>
            
            <div className="bg-black/40 border border-white/5 p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">Gateway_Status</span>
                <span className="text-[10px] text-[#13A940] font-bold uppercase tracking-widest">Confirmed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">Vector_ID</span>
                <span className="text-[10px] text-phoenix-orange font-bold truncate max-w-[120px]">
                  {paymentIntentId?.slice(-12) || "PI_UNKNOWN"}
                </span>
              </div>
            </div>

            <p className="text-white/50 text-[11px] italic">
              Confirmation details have been dispatched to your contact email. Check your calendar for the finalized invite.
            </p>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-white/5">
            <Link 
              href="/" 
              className="group flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-all"
            >
              <span className="text-phoenix-orange group-hover:translate-x-[-4px] transition-transform">←</span> 
              Return to Terminal
            </Link>
          </div>
        </div>
      </div>

      {/* Background Grid/Detail */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] -z-10"></div>
    </main>
  );
}

// 3. The main export just wraps the content in Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-widest">Initializing Terminal...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}