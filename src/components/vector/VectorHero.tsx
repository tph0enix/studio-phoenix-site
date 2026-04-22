import React from 'react';

const VectorHero = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-10 md:py-16 flex flex-col justify-center min-h-[50vh]">
      
      {/* Opener */}
      <div className="mb-6">
        <h1 className="text-5xl md:text-7xl font-inter font-black tracking-tighter leading-[0.9] text-white uppercase">
          Bring your data<br />
          <span className="text-phoenix-orange">back to life.</span>
        </h1>
      </div>

      {/* Vector introduction */}
      <div className="max-w-2xl">
        <h2 className="text-xl md:text-2xl font-inter font-bold text-blue-flame uppercase tracking-tight mb-4">
          Introducing <span className="italic">Vector</span>: Our service solution to help your data work for you.
        </h2>
        <p className="text-lg text-ash-gray font-sans font-light leading-relaxed">
          If you've been fighting spreadsheets, chasing data, or correcting reports weekly: <span className="font-bold">you're doing too much</span>, but somehow <span className="italic">it's never enough</span>. <span className="font-bold">Vector</span> closes that gap by fixing friction and turning data chaos into a <span className="font-bold">foundation you can trust</span>.<br />
            <br />
        </p>
        
        <h2 className="text-lg font-inter font-bold text-phoenix-orange uppercase tracking-tight mb-4">Get your time back & re-ignite your data's potential.</h2>
      </div>

    </section>
  );
};

export default VectorHero;