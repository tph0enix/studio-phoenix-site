const VectorProof = () => {
  const stats = [
    { 
      value: '16+', 
      label: 'Hours of Manual Effort Eliminated', 
      detail: 'Fewer spreadsheet fights. Less pressure. More value added.' 
    },
    { 
      value: '6+', 
      label: 'Hours of Daily Data Load Improvement', 
      detail: 'Faster answers. Less task switching.'
    },
    { 
      value: '70', 
      label: 'Objects Standardized', 
      detail: 'Standardized reporting means faster, deeper insights.' 
    },
    { 
      value: '250', 
      label: 'Employees Data-Trained', 
      detail: 'Knowledgeable coworkers create less cleanup & more cooperation.'
    }
  ];

  return (
    <section id="proof" className="bg-ash-gray/25 border-y border-ash-gray/10">
    <p className="px-6 pt-5 text-xl md:text-2xl font-inter font-bold text-bright-white uppercase tracking-tight mb-4 text-center">
        Starting today, we could help your company achieve...
    </p>
      <div className="py-15 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
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
    <p className="px-6 pb-1 text-xl md:text-2xl font-inter font-bold text-bright-white uppercase tracking-tight mb-4 text-center">
        ...by the end of next month.*
    </p>
    </section>
  );
};

export default VectorProof;