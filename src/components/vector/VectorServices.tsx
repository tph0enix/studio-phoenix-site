import React from 'react';

const VectorServices = () => {
  const processSteps = [
    {
      title: 'Audit',
      phrase: 'Under the Hood.',
      desc: 'We dig into your current structure & processes to find exactly where the friction can be improved.'
    },
    {
      title: 'Roadmap',
      phrase: 'On the Flight Path.',
      desc: 'No bloat. Just the practical, necessary changes. And we always keep your current people & time in mind--no sudden shifts in tooling & training unless absolutely necessary.'
    },
    {
      title: 'Implementation',
      phrase: 'Through the Reignition.',
      desc: 'We do the heavy lifting, building pipelines & models from blueprint to reality--all while keeping you in the loop.'
    },
    {
      title: 'Maintenance',
      phrase: 'Into the Future.',
      desc: 'We protect the fire by training your people to use the tools & follow the processes. This keeps your standards sharp and the system thriving long-term.'
    }
  ];

  const coreComponents = [
    { 
      name: 'Automation', 
      detail: 'Manual effort is a bug, not a feature. We engineer it out, so humans can do human things again.' 
    },
    { 
      name: 'Performance & Stability', 
      detail: 'Data loads & code changes shouldn\'t cost your evening. We get your time back.'
    },
    { 
      name: 'Governance', 
      detail: 'No more data silos or "shadow IT". We support one clear version of the truth, told the right way.'
    },
    { 
      name: 'Training', 
      detail: 'We duplicate our expertise into your team so the standards hold.'
    }
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-30">
      {/* Narrative Header */}
      <div className="mb-24">
        <h2 className="text-5xl md:text-7xl font-inter font-black uppercase tracking-tighter text-bright-white leading-none mb-6">
          Let's <span className="text-phoenix-orange">reignite</span> your engine.
        </h2>
        <p className="max-w-2xl text-ash-gray text-lg font-light leading-relaxed">
          We aren't your usual consulting firm. We provide the 
          <span className="text-bright-white font-medium"> VECTOR </span> 
          to move you from manual chaos to architectural victory--all in just 4 steps or less.
        </p>
      </div>

      {/* The Process: Narrative Vertical Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
        {processSteps.map((step, i) => (
          <div key={i} className="relative border-t border-ash-gray/20 pt-8 group">
            <span className="absolute -top-4 left-0 bg-deep-black px-2 text-phoenix-orange font-mono text-sm font-black">
              0{i + 1} // {step.title}
            </span>
            <h3 className="text-3xl font-inter font-extrabold uppercase text-bright-white mb-4">
              {step.phrase}
            </h3>
            <p className="text-ash-gray text-sm leading-relaxed max-w-md">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* The Choice Note */}
      <div className="mb-32 p-8 border-l-2 border-phoenix bg-bright-white/5">
        <p className="text-ash-gray text-[11px] font-mono uppercase tracking-[0.3em]">
          Modular Selection: You pick the components you need; we handle the rest.
        </p>
      </div>

      {/* The 4 Components: The Vector Grid */}
      <div className="mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreComponents.map((comp, i) => (
            <div key={i} className="bg-ash-gray/5 p-8 border border-transparent hover:border-phoenix/50 transition-all">
              <h4 className="text-2xl font-inter font-black uppercase text-bright-white italic mb-2">
                {comp.name}
              </h4>
              <p className="text-xs text-ash-gray font-light leading-snug">
                {comp.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The "Patient" CTA */}
      <div className="border-t border-ash-gray/20 pt-32 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-inter font-black uppercase tracking-tighter text-bright-white mb-8">
            Ready to see what <span className="text-phoenix-orange">VECTOR</span> can do for you?
          </h3>
          <p className="text-ash-gray text-base font-light">
            You’ve made it this far. You aren't looking for a quick fix: you want an architectural shift. <br /><br />And we love working with companies like that. 
            <br /><br />If that’s you, let’s talk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VectorServices;