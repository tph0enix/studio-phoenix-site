'use client';

import { Search, Map, Hammer, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const VectorServices = () => {
    const [isReignited, setIsReignited] = useState(false);
    const reigniteRef = useRef(null);

    useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
        // If the word is at least 50% on screen, ignite it.
        setIsReignited(entry.isIntersecting);
        },
        { threshold: 0.5 } // Adjust this to 0.1 if you want it to glow the moment it peeks in
    );

    if (reigniteRef.current) {
        observer.observe(reigniteRef.current);
    }

    return () => observer.disconnect();
    }, []);

    const processSteps = [
        {
            title: 'Audit',
            icon: <Search className="w-8 h-8 text-phoenix-orange" />, // Simple & fast
            phrase: 'Under the Hood.',
            desc: 'We dig into your current structure & processes to find exactly where the friction can be improved.'
        },
        {
            title: 'Roadmap',
            icon: <Map className="w-8 h-8 text-phoenix-orange" />, // The Vector
            phrase: 'On the Flight Path.',
            desc: 'We map the practical, necessary changes to meet both your immediate & long-term needs.'
        },
        {
            title: 'Implementation',
            icon: <Hammer className="w-8 h-8 text-phoenix-orange" />, // Reignition
            phrase: 'Through the Reignition.',
            desc: 'We build the pipelines & models from blueprint to reality--all while keeping you in the loop.'
        },
        {
            title: 'Maintenance',
            icon: <ShieldCheck className="w-8 h-8 text-phoenix-orange" />, // Stewardship
            phrase: 'Into the Future.',
            desc: 'We protect your new setup by training your people to use the tools & processes.'
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

    const bracketBlink = `
        @keyframes bracket-spark {
            /* Starts dead */
            0% { opacity: 0; }

            /* First quick flicker */
            10% { opacity: 1; }
            15% { opacity: 0; }

            /* Second longer hold */
            16% { opacity: 1; }
            21% { opacity: 0; }

            /* Final struggle */
            25% { opacity: 1; }
            30% { opacity: 0; }

            /* Locks into solid state */
            80% { opacity: 1; }
            100% { opacity: 1; }
        }
        .group:hover .animate-spark {
            animation: bracket-spark 0.5s ease-in-out forwards;
        }
    `;

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-30">
        <style>{bracketBlink}</style>
      
        {/* Narrative Header */}
        <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-inter font-black uppercase tracking-tighter text-bright-white leading-none mb-6">
                Let's <span 
                    ref={reigniteRef}
                    className={`
                    text-phoenix-orange transition-all duration-500 ease-in-out
                    ${isReignited 
                        ? "[filter:drop-shadow(0_0_15px_rgba(242,152,1,0.7))_drop-shadow(0_0_50px_rgba(242,152,1,0.5))] saturate-[2] brightness-125" 
                        : "filter-none saturate-100 brightness-100"
                    }
                    `}>reignite</span> your engine.
            </h2>
            <p className="max-w-2xl text-ash-gray text-lg font-light leading-relaxed">
                We aren't your usual consulting firm. We provide the <span className="text-bright-white font-medium"> VECTOR </span> to move you from manual chaos to architectural victory--all in just 4 steps or less.
            </p>
        </div>

      {/* The Process: Narrative Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {processSteps.map((step, i) => (
          <div key={i} className="relative pt-3 group cursor-default">
            <div className="flex flex-cols-2 ignition-trigger">
            {/* Icon Container */}
                <span className="
                    w-12 h-10 
                    flex 
                    text-phoenix-orange
                    transition-all duration-300 
                    group-hover:[filter:drop-shadow(0_0_5px_#F29801)_drop-shadow(0_0_30px_#F29801)_drop-shadow(0_0_30px_#F29801)_drop-shadow(0_0_60px_#F29801)]
                    group-hover:saturate-[2]
                ">
                    {step.icon}
                </span>

                <h3 className="text-3xl h-10 font-inter font-extrabold uppercase text-bright-white">
                    {step.phrase}
                </h3>
            </div>

            <div className="relative p-4 max-w-md">
                {/* THE ANIMATED BORDER SVG */}
                <svg
                    className="
                        absolute inset-0 w-full h-full 
                        pointer-events-none
                    "
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* TOP-LEFT BRACKET: Starts 35% down the left side, goes up to corner, then 35% right */}
                    <path
                    d="M 0 35 L 0 0 L 35 0"
                    fill="none"
                    stroke="#1935C2"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    className="
                        transition-all duration-300 ease-in-out 
                        /* The path length is approx 100 units in this viewbox */
                        [stroke-dasharray:1000] [stroke-dashoffset:1000] 
                        group-hover:duration-900
                        group-hover:[stroke-dashoffset:0]
                        animate-spark
                    "
                    />
                    {/* BOTTOM-RIGHT BRACKET: Starts 35% up the right side, goes down to corner, then 35% left */}
                    <path
                    d="M 100 65 L 100 100 L 65 100"
                    fill="none"
                    stroke="#1935C2"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    className="
                        transition-all duration-300 ease-in-out 
                        [stroke-dasharray:1000] [stroke-dashoffset:1000] 
                        group-hover:duration-900
                        group-hover:[stroke-dashoffset:0]
                        animate-spark
                    "
                    />
                </svg>

                <p className="text-ash-gray text-sm leading-relaxed max-w-md pl-3">
                    {step.desc}
                </p>
            </div>

          </div>
        ))}
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