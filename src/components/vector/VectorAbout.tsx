import React from 'react';

const VectorAbout = () => {
  return (
    /* Added mx-auto to center the section container itself */
    <section id="about" className="max-w-7xl mx-auto px-6 py-32">
        {/* Main wrapper: items-center ensures children are horizontally centered */}
        <div className="flex flex-col items-center text-center">
            
            <p className="text-blue-flame text-lg font-mono font-black uppercase tracking-[0.4em] mb-8">
              [Meet the Architect]
            </p>

            {/* Profile Section: Using md:flex-row to align image and text */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-5">
            
                {/* Profile Image Column */}
                <div className="relative w-40 h-40 md:w-50 md:h-50 overflow-hidden border border-white/10">
                    <img 
                        src="/images/branding/profile.jpg" 
                        alt="Tristan Phoenix" 
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                </div>

                {/* Intro Column */}
                <div className="text-left">
                    <h2 className="text-5xl md:text-6xl font-inter font-black tracking-tighter text-bright-white leading-none mb-6">
                      Tristan Phoenix
                    </h2>
                    <h3 className="text-[11px] font-inter font-bold text-ash-gray tracking-widest border-l-2 border-phoenix-orange pl-4 uppercase leading-relaxed">
                        MS in Mathematics • BS in Biomedical Engineering • Purdue<br />
                        Stanford ML • UC Berkeley Database Design<br />
                        10+ Years Data Experience • 20+ Years Programming<br />
                        20+ Years Teaching & Tutoring
                    </h3>
                </div>
            </div>

            {/* Bio Block: Added mx-auto so the 800px container sits in the middle */}
            <div className="space-y-3 text-ash-gray text-base font-light leading-relaxed max-w-[800px] text-left mx-auto">
                <p>
                    <span className="text-phoenix-orange font-medium">Studio Phoenix</span> is what I call a <span className="text-bright-white font-medium">"reality company"</span>: a business that strives toward restoring authentic beauty & information in the Age of the Digital Facade. My hope? To help truth & beauty rise from the ashes.
                </p>
                <p>
                    As an Artist-Engineer, my passion seeks mathematical beauty in everything. To me, form and function go hand-in-hand: the most beautiful things are those that fit logically with their environment, and vice-versa. Life is meant to be lived well, and everything I do is meant to support that end through automation, cleanup, or even just simple acts of kindness.
                </p>

                <p>
                    When I'm not handling data, I'm architecting <span className="italic">(i.e., writing, worldbuilding, drawing, & strategizing)</span> a massive manga series called <span className="text-phoenix-orange font-medium italic">Resonant</span>. I live in Duluth, GA, USA, outnumbered by my three cats and several friends whom I cherish.
                </p>
            </div>
        </div>
    </section>
  );
};

export default VectorAbout;