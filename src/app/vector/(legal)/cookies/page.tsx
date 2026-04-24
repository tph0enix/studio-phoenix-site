import React from 'react';

export default function CookiesPage() {
  const lastUpdated = "April 23, 2026";

  return (
    <main className="min-h-screen bg-deep-black pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* System Header */}
        <div className="border-l-2 border-blue-flame pl-6 mb-16">
          <p className="text-blue-flame font-mono text-xs font-black tracking-[0.4em] uppercase mb-2">
            [SYS_DOC_003]
          </p>
          <h1 className="text-5xl md:text-6xl font-inter font-black uppercase text-bright-white tracking-tighter leading-none">
            Cookie_Policy
          </h1>
          <p className="text-ash-gray font-mono text-[10px] mt-4 uppercase tracking-widest">
            Last_Modified // {lastUpdated}
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-ash-gray text-[11px] md:text-xs font-light leading-relaxed uppercase tracking-widest">
          
          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[01] PROTOCOL_OVERVIEW</h2>
            <p>
              To ensure the [VECTOR] engine runs at peak performance, we utilize "cookies"—small data packets stored on your local hardware. These are not used for predatory surveillance. They are purely functional components designed to stabilize your experience within the Studio Phoenix ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[02] ESSENTIAL_COOKIES</h2>
            <p>
              These cookies are the "Fuel Injectors" of the site. They are strictly necessary for:
              <br />• Maintaining secure session states.
              <br />• Preventing cross-site request forgery (CSRF) attacks.
              <br />• Ensuring the "Get Started" ignition portal functions correctly.
              <br />You cannot disable these without compromising the structural integrity of the site.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[03] ANALYTICS_&_DIAGNOSTICS</h2>
            <p>
              We may use high-performance analytics (like Vercel Analytics) to monitor system health and traffic patterns. This data is anonymized. We care about how the engine is performing, not who is driving it.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[04] USER_CONFIGURATION</h2>
            <p>
              Most browsers allow you to purge or block cookies via their internal settings. However, be advised that "locking the gears" may result in a suboptimal reality-viewing experience. 
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