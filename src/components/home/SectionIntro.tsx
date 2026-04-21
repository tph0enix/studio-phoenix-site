export default function SectionIntro() {
  return (
    <section className="relative min-h-[150vh] flex flex-col items-center justify-center px-6">
      
      {/* THE SPARK / TRANSITION TEXT */}
      <div className="max-w-3xl text-center z-10 space-y-12">
        <p className="text-zinc-400 text-xl italic leading-relaxed">
          The pursuit of wealth in spite of human empathy has turned our world to ash. 
          But there still shines a tiny light of hope that refuses to subscribe: the human spirit. 
          We still create despite automation, we still learn despite convenience, 
          and we still hope against all odds.
        </p>

        {/* THE BRAND REVEAL */}
        <div className="py-20">
          <h2 className="text-zinc-500 uppercase tracking-[0.3em] text-sm mb-4">
            And from this spark, a new order rises:
          </h2>
          <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">
            Studio Phoenix
          </h3>
          <p className="text-orange-500 font-mono text-lg mt-4 tracking-widest">
            A WORLD REAL-BORN
          </p>
        </div>

        {/* THE CONNECTION HOOK */}
        <div className="max-w-xl mx-auto border-t border-zinc-800 pt-12">
          <p className="text-2xl text-white font-medium">
            This new world includes two big places: <br />
            <span className="text-orange-400">Truth</span> and <span className="text-orange-400">Meaning</span>.
          </p>
          <p className="text-zinc-500 mt-4 text-sm italic">
            (And believe it or not, they are related!)
          </p>
        </div>
      </div>
    </section>
  );
}