'use client';

import { GraduationCap, Bot, Landmark, Gauge, Book } from 'lucide-react';
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
            title: '1 - Audit',
            desc: 'We dig into your current structure & processes to find exactly where the friction can be improved.'
        },
        {
            title: '2 - Roadmap',
            desc: 'We map the practical, necessary changes to meet both your immediate & long-term needs.'
        },
        {
            title: '3 - Implementation',
            desc: 'We build the pipelines & models from blueprint to reality--all while keeping you in the loop.'
        },
        {
            title: '4 - Maintenance',
            desc: 'We protect your new setup by training your people to use the tools & processes.'
        }
    ];

    const coreComponents = [
        { 
            name: 'Automation', 
            icon: <Bot className="w-8 h-8 text-phoenix-orange" />,
            detail: 'Manual effort is a bug, not a feature. We engineer it out, so humans can do human things again.' 
        },
        { 
            name: 'Performance & Stability', 
            icon: <Gauge className="w-8 h-8 text-phoenix-orange" />,
            detail: 'Data loads & code changes shouldn\'t cost your evening. We get your time back.'
        },
        { 
            name: 'Governance', 
            icon: <Landmark className="w-8 h-8 text-phoenix-orange" />,
            detail: 'No more data silos or "shadow IT". We support one clear version of the truth, told the right way.'
        },
        { 
            name: 'Training', 
            icon: <GraduationCap className="w-8 h-8 text-phoenix-orange" />,
            detail: 'We duplicate our expertise into your team so the standards hold.'
        },
        { 
            name: 'Storytelling', 
            icon: <Book className="w-8 h-8 text-phoenix-orange" />,
            detail: 'Your data tells a story. We help it speak.'
        }
    ];

    const bracketBlink = `
        @keyframes bracket-spark {

            /* Second longer hold */
            0% { opacity: 1; }
            74% { opacity: 0; }

            /* Final struggle */
            75% { opacity: 1; }
            89% { opacity: 0; }

            /* Locks into solid state */
            90% { opacity: 1; }
            100% { opacity: 1; }
        }
        .group:hover .animate-spark {
            animation: bracket-spark 0.5s ease-in-out forwards;
        }
    `;

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-10">
        <style>{bracketBlink}</style>
      
        {/* Narrative Header */}
        <div className="mb-12 pt-20">
            <h2 className="text-5xl md:text-7xl font-inter font-black uppercase tracking-tighter text-bright-white leading-none mb-6">
                Let's <span 
                    ref={reigniteRef}
                    className={`text-phoenix-orange transition-all duration-500 ease-in-out
                    ${isReignited 
                        ? "[filter:drop-shadow(0_0_15px_rgba(242,152,1,0.7))_drop-shadow(0_0_50px_rgba(242,152,1,0.5))] saturate-[2] brightness-125" 
                        : "filter-none saturate-100 brightness-100"
                    }
                    `}>reignite</span> your engine.
            </h2>
            <p className="max-w-2xl text-ash-gray text-lg font-light leading-relaxed">
                We aren't your usual consulting firm. We provide the <span className="text-bright-white font-medium"> VECTOR </span> to move you from chaos to clarity in four ways.
            </p>
        </div>

      {/* The Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {coreComponents.map((area, i) => (
          <div key={i} className="relative pt-3 group cursor-default">
            <div className="flex flex-cols-2 ignition-trigger">
            {/* Icon Container */}
                <span className="w-12 h-10 flex text-phoenix-orange transition-all duration-300 group-hover:[filter:drop-shadow(0_0_5px_#F29801)_drop-shadow(0_0_30px_#F29801)_drop-shadow(0_0_30px_#F29801)_drop-shadow(0_0_60px_#F29801)] group-hover:saturate-[2]">
                    {area.icon}
                </span>

                <h3 className="text-3xl h-10 font-inter font-extrabold uppercase text-bright-white">
                    {area.name}
                </h3>
            </div>

            <div className="relative p-4 max-w-md">
                {/* THE ANIMATED BORDER SVG */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
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
                    className="transition-all duration-300 ease-in-out [stroke-dasharray:1000] [stroke-dashoffset:1000] group-hover:duration-900 group-hover:[stroke-dashoffset:0] animate-spark"
                    />
                    {/* BOTTOM-RIGHT BRACKET: Starts 35% up the right side, goes down to corner, then 35% left */}
                    <path
                    d="M 100 65 L 100 100 L 65 100"
                    fill="none"
                    stroke="#1935C2"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    className="transition-all duration-300 ease-in-out [stroke-dasharray:1000] [stroke-dashoffset:1000] group-hover:duration-900 group-hover:[stroke-dashoffset:0] animate-spark"
                    />
                </svg>

                <p className="text-ash-gray text-sm leading-relaxed max-w-md pl-3">
                    {area.detail}
                </p>
            </div>

          </div>
        ))}
      </div>

      {/* The 4 steps */}
      <div id="process" className="mb-40">
            <h2 className="text-3xl md:text-3xl font-inter font-black uppercase tracking-tighter text-bright-white leading-none mb-6 mt-24 text-center">Our proven 4-step Vector path</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t-2 border-blue-flame">
                
                {processSteps.map((step, i) => (
                <div 
                    key={i} 
                    className="group relative p-6 bg-ash-gray/5 border-l-2 border-transparent hover:border-blue-flame transition-all duration-300 cursor-default"
                >
                    <h4 className="text-xl font-inter font-black tracking-tighter mb-2 text-bright-white transition-colors group-hover: text-phoenix-orange group-hover:[filter:drop-shadow(0_0_5px_#F29801)_drop-shadow(0_0_30px_#F29801)] group-hover:saturate-[2] transition-transform group-hover:translate-x-1">
                    {step.title}
                    </h4>
                    
                    <p className="text-[11px] text-ash-gray font-light leading-relaxed tracking-wider group-hover:text-bright-white transition-colors">
                    {step.desc}
                    </p>

                    {/* Bottom Detail Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-flame group-hover:w-full transition-all duration-500" />
                </div>
                ))}
            </div>
        </div>

      {/* The CTA */}
      <div className="border-t border-ash-gray/20 pt-32 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-inter font-black uppercase tracking-tighter text-bright-white mb-8">
            Ready to see what <span className="text-phoenix-orange">VECTOR</span> can do for you?
          </h3>
          <p className="text-ash-gray text-base font-light">
            You want smoother life & operations. We're here to make that real.<br /><br />You're a human--not bottom-line fodder for mediocre consultants.
            <br /><br />Stop losing time, money, peace, and sleep.
            <br /><br />Let’s talk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VectorServices;