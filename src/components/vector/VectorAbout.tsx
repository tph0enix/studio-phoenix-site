import React from 'react';

const VectorAbout = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-32 bg-deep-black border-t border-ash-gray/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Profile Image Column */}
        <div className="lg:col-span-5 relative group">
          {/* Decorative Border/Frame */}
          <div className="absolute -inset-4 border border-phoenix/20 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
          
          {/* Profile Pic Placeholder */}
          <div className="relative aspect-[4/5] bg-ash-gray/10 overflow-hidden border border-ash-gray/20">
            {/* Replace the 'src' below with your actual image path */}
            <img 
              src="/path-to-your-photo.jpg" 
              alt="Tristan Phoenix" 
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Overlay Branding */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-deep-black to-transparent">
              <span className="text-[10px] font-mono font-black text-phoenix uppercase tracking-[0.5em]">
                System Architect // 01
              </span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <p className="text-blue-flame text-xs font-mono font-black uppercase tracking-[0.4em] mb-4">
              [THE ARCHITECT]
            </p>
            <h2 className="text-5xl md:text-7xl font-inter font-black uppercase tracking-tighter text-bright-white italic leading-none mb-6">
              Tristan <span className="text-phoenix">Phoenix.</span>
            </h2>
            <h3 className="text-lg font-inter font-bold text-ash-gray uppercase tracking-widest italic border-l-2 border-phoenix pl-4">
              MS in Mathematics • Purdue University
            </h3>
          </div>

          <div className="space-y-6 text-ash-gray text-base font-light leading-relaxed max-w-2xl">
            <p>
              I don’t see data as a collection of reports; I see it as a 
              <span className="text-bright-white font-medium"> system of friction and flow.</span> 
              With a background in Mathematics from Purdue, my approach to architecture 
              is literal, rigorous, and designed to scale. I specialize in identifying 
              the "rot" in an enterprise’s data estate and replacing it with 
              high-velocity, unified standards.
            </p>

            <p>
              When I’m not scorching manual waste in a [VECTOR] environment, 
              I’m usually building something else. I’m the founder of a publishing 
              company, currently architecting a comic universe called 
              <span className="text-phoenix font-medium italic"> Resonant.</span>
            </p>

            <p>
              I believe in non-predatory business models, structural integrity, 
              and the occasional "no-shite" reality check. I live in Duluth, GA, 
              where I’m heavily outnumbered by my three cats.
            </p>
          </div>

          {/* Core Traits / Fast Facts */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-ash-gray/10 pt-12">
            <div>
              <p className="text-[10px] font-mono font-black text-blue-flame uppercase tracking-widest mb-1">Origin</p>
              <p className="text-sm text-bright-white font-bold italic">Duluth, GA / Remote</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-black text-blue-flame uppercase tracking-widest mb-1">Focus</p>
              <p className="text-sm text-bright-white font-bold italic">Data Infrastructure</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-black text-blue-flame uppercase tracking-widest mb-1">Creativity</p>
              <p className="text-sm text-bright-white font-bold italic">Digital Art & Manga</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VectorAbout;