import React from 'react';

export default function TermsPage() {
  const lastUpdated = "April 23, 2026";

  return (
    <main className="min-h-screen bg-deep-black pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* System Header */}
        <div className="border-l-2 border-blue-flame pl-6 mb-16">
          <p className="text-blue-flame font-mono text-xs font-black tracking-[0.4em] uppercase mb-2">
            [SYS_DOC_002]
          </p>
          <h1 className="text-5xl md:text-6xl font-inter font-black uppercase text-bright-white tracking-tighter leading-none">
            Terms_of_Service
          </h1>
          <p className="text-ash-gray font-mono text-[10px] mt-4 uppercase tracking-widest">
            Last_Modified // {lastUpdated}
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-ash-gray text-[11px] md:text-xs font-light leading-relaxed uppercase tracking-widest">
          
          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[01] ACCEPTANCE_OF_PROTOCOL</h2>
            <p>
              By accessing vector.studiophoenix.ink or engaging with our systems, you agree to these Terms of Service. If you do not agree with this architecture, do not initiate ignition. We reserve the right to modify these terms at any time to maintain system integrity.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[02] SERVICE_ARCHITECTURE</h2>
            <p>
              [VECTOR] provides high-end data infrastructure, automation, and technical architecture services. We are not a volume-based agency. We are a "Reality Company." Every project is a custom-built solution designed for structural beauty and performance. We reserve the right to refuse projects that compromise our standards of integrity.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[03] CLIENT_OBLIGATIONS</h2>
            <p>
              Whoever is representing your data must provide accurate, timely, and clean access to necessary systems. We cannot fix an engine if the hood is locked. You are responsible for the validity of the data provided to us.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[04] INTELLECTUAL_PROPERTY</h2>
            <p>
              Studio Phoenix retains ownership of all "Engine" components, custom scripts, and architectural frameworks developed unless otherwise specified in a signed Master Services Agreement (MSA). You are granted a license to use the final deliverables for your specific business operations. You own your raw data; we own the magic that makes it sing.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[05] LIABILITY_LIMITATIONS</h2>
            <p>
              While we strive for 99.9% system stability, [VECTOR] is not liable for data loss or business interruption caused by third-party providers, legacy bugs in your existing stack, or "acts of God." We provide the roadmap; you must drive the car. Total liability is limited to the amount paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[06] TERMINATION_OF_IGNITION</h2>
            <p>
              We may suspend or terminate your access to our services if we find you are in violation of these terms or if the working relationship becomes "unstable" (i.e., non-payment, predatory behavior, or systemic neglect).
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