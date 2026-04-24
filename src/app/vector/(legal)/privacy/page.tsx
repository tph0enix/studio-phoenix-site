import React from 'react';

export default function PrivacyPage() {
  const lastUpdated = "April 23, 2026";

  return (
    <main className="min-h-screen bg-deep-black pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* System Header */}
        <div className="border-l-2 border-blue-flame pl-6 mb-16">
          <p className="text-blue-flame font-mono text-xs font-black tracking-[0.4em] uppercase mb-2">
            [SYS_DOC_001]
          </p>
          <h1 className="text-5xl md:text-6xl font-inter font-black uppercase text-bright-white tracking-tighter leading-none">
            Privacy_Policy
          </h1>
          <p className="text-ash-gray font-mono text-[10px] mt-4 uppercase tracking-widest">
            Last_Modified // {lastUpdated}
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-ash-gray text-[11px] md:text-xs font-light leading-relaxed uppercase tracking-widest">
          
          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[01] INTENT</h2>
            <p>
              At Studio Phoenix, we value structural integrity—both in data and in human relationships. This policy outlines how [VECTOR] handles your information. We don't believe in predatory data mining. We believe in building systems that work for people, not exploiting people for the system.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[02] DATA_COLLECTION</h2>
            <p className="mb-4">
              We only collect information that you explicitly provide to us via our "Get Started" ignition portal. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 border-l border-white/5">
              <li>Electronic mail addresses (Email)</li>
              <li>Names or aliases provided during inquiry</li>
              <li>Project-specific details or "Wishlist" data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[03] USAGE_PARAMETERS</h2>
            <p>
              Your data is used strictly for the following architecture tasks:
              <br />• Initial system diagnostics and roadmapping.
              <br />• Communication regarding project status and availability.
              <br />• Direct outreach from Tristan Phoenix (The Architect).
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[04] THIRD_PARTY_INTEGRATION</h2>
            <p>
              We utilize high-performance infrastructure to host this site (e.g., Vercel). These providers may process technical metadata (IP addresses, browser types) solely for the purpose of maintaining system stability and uptime. We do not sell your data to third-party advertisers. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[05] YOUR_RIGHTS</h2>
            <p>
              You have the right to request the total "Purge" of your data from our records. If you wish to be removed from our systems, contact us at the vector.studiophoenix.ink portal.
            </p>
          </section>

          <section className="pt-12 border-t border-white/5">
            <p className="text-blue-flame font-mono text-[10px] font-black">
              // END_OF_DOCUMENT
            </p>
            <p className="mt-2 text-ash-gray/40">
              Studio Phoenix
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}