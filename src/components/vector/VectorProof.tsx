const VectorProof = () => {
  const stats = [
    { 
      value: '99%', 
      label: 'Efficiency Gains', 
      detail: 'Reduced data bloat for global divisions via logic restructuring.' 
    },
    { 
      value: '150+', 
      label: 'Users Trained', 
      detail: 'Established internal Centers of Excellence for data governance.' 
    },
    { 
      value: '99.8%', 
      label: 'Load Reduction', 
      detail: 'Automated cycles saving weeks of manual processing per month.' 
    }
  ];

  return (
    <section id="proof" className="bg-deep-black/50 py-20 border-y border-ash-gray/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 font-sans">
        {stats.map((stat, i) => (
          <div key={i}>
            <span className="block text-5xl font-inter font-extrabold mb-2 text-phoenix-orange">
              {stat.value}
            </span>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-bright-white font-white mb-2">
              {stat.label}
            </p>
            <p className="text-ash-gray text-sm leading-snug font-light border-l border-blue-flame pl-[7px]">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VectorProof;