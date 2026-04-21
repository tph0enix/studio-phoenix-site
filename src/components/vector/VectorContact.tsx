const VectorContact = () => {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
      <div className="bg-[#13A940] p-12 text-[#20201F]">
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 italic">
          Initiate Vector.
        </h2>
        <p className="font-bold mb-8 max-w-lg">
          Serious inquiries only. All partnerships begin with a 60-minute Architectural Diagnostic or a fixed-price Audit.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-[#20201F] text-[#F3F1EC] px-8 py-4 font-black uppercase tracking-widest hover:bg-[#1935C2] transition-colors w-full">
            Book Diagnostic — $250
          </button>
          <button className="border-2 border-[#20201F] text-[#20201F] px-8 py-4 font-black uppercase tracking-widest hover:bg-[#20201F] hover:text-[#F3F1EC] transition-colors w-full">
            Request Audit Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default VectorContact;