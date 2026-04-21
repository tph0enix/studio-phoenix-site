import React from 'react';

const VectorServices = () => {
  const categories = [
    { 
      title: 'Governance', 
      desc: 'Reducing communication friction and ensuring data compatibility.', 
      color: '#F29801' 
    },
    { 
      title: 'Performance & Stability', 
      desc: 'Achieving 99% efficiency gains and 99.8% server load reductions.', 
      color: '#1935C2' 
    },
    { 
      title: 'Automation', 
      desc: 'Replacing manual extractions with unified high-velocity pipelines.', 
      color: '#8A8986' 
    }
  ];

  const serviceTypes = [
    { label: 'Audit', detail: 'Final score & systemic friction identification.' },
    { label: 'Roadmap', detail: 'Strategic definition of transformation steps.' },
    { label: 'Implementation', detail: 'Actual construction of models & pipelines.' },
    { label: 'Maintenance', detail: 'Ongoing optimization & Council leadership.' }
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24 font-sans">
      <div className="mb-16">
        <h2 className="text-4xl font-inter font-extrabold uppercase tracking-tighter text-phoenix italic mb-4">
          Modular Engineering
        </h2>
        <p className="text-ash-gray text-[10px] font-mono uppercase tracking-[0.4em] font-black">
          Independent Service Components
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col">
            <div className="mb-8 border-l-4 pl-4" style={{ borderColor: cat.color }}>
              <h3 className="text-2xl font-inter font-extrabold uppercase text-bright-white mb-2">{cat.title}</h3>
              <p className="text-xs text-ash-gray leading-relaxed italic font-light">{cat.desc}</p>
            </div>
            <div className="flex flex-col gap-4">
              {serviceTypes.map((type, j) => (
                <div key={j} className="group bg-deep-black border border-ash-gray/10 p-6 hover:border-grounded-green transition-all cursor-pointer">
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-flame">
                    0{j + 1}. {type.label}
                  </span>
                  <h4 className="text-bright-white text-sm font-bold mt-2 mb-1">{type.label} / {cat.title}</h4>
                  <p className="text-[11px] text-ash-gray leading-snug">{type.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VectorServices;