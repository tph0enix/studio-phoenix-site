import React from 'react';

export default function TermsPage() {
  const lastUpdated = "May 2, 2026";

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
              By accessing vector.studiophoenix.ink or engaging with our systems, you agree to these Terms of Service. If you do not agree with this architecture, do not initiate ignition. We reserve the right to modify these terms at any time to maintain system integrity. Continued use of this site following any modification constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[02] SERVICE_ARCHITECTURE</h2>
            <p>
              [VECTOR] provides high-end data infrastructure, automation, and technical architecture services. We are not a volume-based agency. We are a "Reality Company." Every project is a custom-built solution designed for structural beauty and performance. We reserve the right to refuse projects that compromise our standards of integrity. All services are subject to a signed Statement of Work (SOW) or Master Services Agreement (MSA) prior to commencement.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[03] CLIENT_OBLIGATIONS</h2>
            <p>
              Whoever is representing your data must provide accurate, timely, and clean access to necessary systems. We cannot fix an engine if the hood is locked. You are responsible for the validity of the data provided to us. You warrant that you have the legal right to share any data, credentials, or system access provided to Studio Phoenix in the course of an engagement.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[04] INTELLECTUAL_PROPERTY</h2>
            <p>
              Studio Phoenix LLC retains ownership of all proprietary frameworks, reusable components, custom scripts, and architectural methodologies developed unless otherwise specified in a signed Master Services Agreement (MSA). Upon receipt of full payment, you are granted a perpetual, non-transferable license to use the final deliverables for your specific internal business operations. You own your raw data. Studio Phoenix owns the systems, logic, and architecture built to make it work. Any pre-existing Studio Phoenix intellectual property incorporated into deliverables remains the sole property of Studio Phoenix LLC.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[05] PAYMENT_TERMS</h2>
            <p>
              All consultation fees are due at the time of booking. Project-based engagements require a deposit as specified in the applicable SOW prior to work commencing. Invoices for ongoing or milestone-based work are due within 14 days of issuance. Late payments are subject to a 1.5% monthly finance charge. Studio Phoenix reserves the right to suspend work on any engagement where payment is more than 14 days overdue. No refunds are issued for consultation fees once a session has occurred. Project deposit refunds are subject to the terms of the applicable SOW.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[06] CONFIDENTIALITY</h2>
            <p>
              Studio Phoenix LLC treats all client data, system access, business information, and internal processes as strictly confidential. We do not share, sell, or disclose client information to third parties except as required by law. Clients agree to treat any proprietary Studio Phoenix methodologies, frameworks, or processes disclosed during an engagement as confidential and not to reproduce or distribute them without express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[07] DATA_COLLECTION & PRIVACY</h2>
            <p>
              When you submit your business email via this site, it is collected solely for the purpose of initiating a consultation or service inquiry with Studio Phoenix LLC. We do not sell or share your contact information with third parties. You may request removal from our records at any time by contacting support@studiophoenix.ink. For full details on how we handle your data, refer to our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[08] PROHIBITION_ON_AI_TRAINING</h2>
            <p>
              All content, copy, design, code, methodologies, and materials published on this website are the intellectual property of Studio Phoenix LLC. You may not use any content from this site — in whole or in part — to train, fine-tune, evaluate, or otherwise develop artificial intelligence or machine learning models without express written consent from Studio Phoenix LLC. This prohibition applies to all automated crawlers, scrapers, bots, and data collection methods, regardless of whether they respect robots.txt directives. Violation of this clause constitutes copyright infringement and will be pursued accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[09] LIABILITY_LIMITATIONS</h2>
            <p>
              While we strive for 99.9% system stability, [VECTOR] is not liable for data loss or business interruption caused by third-party providers, legacy bugs in your existing stack, or events beyond our reasonable control. We provide the roadmap; you must drive the car. Total liability in connection with any engagement is limited to the total amount paid to Studio Phoenix LLC for the specific service in question within the 90 days preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[10] TERMINATION_OF_IGNITION</h2>
            <p>
              We may suspend or terminate your access to our services if you are in violation of these terms or if the working relationship becomes non-viable due to: non-payment, predatory or abusive behavior toward Studio Phoenix personnel, material misrepresentation of your data environment or business needs, or systematic failure to fulfill client obligations as defined in Section 03. Upon termination, all licenses granted under these terms cease immediately. Clauses 04, 06, 07, 08, and 09 survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-bright-white font-bold mb-4 text-sm tracking-[0.2em]">[11] GOVERNING_LAW</h2>
            <p>
              These Terms of Service are governed by the laws of the State of Georgia, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved exclusively in the state or federal courts located in Gwinnett County, Georgia. You consent to personal jurisdiction in such courts.
            </p>
          </section>

          <section className="pt-12 border-t border-white/5">
            <p className="text-blue-flame font-mono text-[10px] font-black">
              // END_OF_DOCUMENT
            </p>
            <p className="mt-2 text-ash-gray/40">
              Studio Phoenix LLC // Duluth, Georgia
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
