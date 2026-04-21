export default function SectionAreas() {
  return (
    <section className="relative z-10 space-y-[100vh]">
      {/* MEANING REBORN */}
      <div className="min-h-screen flex items-center px-10">
        <div className="max-w-3xl">
          <h2 className="text-6xl font-black mb-6">Meaning Reborn</h2>
          <p className="text-xl text-zinc-300 mb-10">
            When everything is a trend, nothing is a classic; and when everything is automated, nothing is human...
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-black font-bold">Original Manga</button>
            <button className="px-6 py-2 border border-white">Publishing</button>
          </div>
        </div>
      </div>

      {/* TRUTH REFINED */}
      <div className="min-h-screen flex items-center justify-end px-10 text-right">
        <div className="max-w-3xl">
          <h2 className="text-6xl font-black mb-6">Truth Refined</h2>
          <p className="text-xl text-zinc-300 mb-10">
            Without a clear picture of what's real, the world is overrun with fake news... 
            (Good thing none of THAT is happening! ...right?)
          </p>
          <div className="flex gap-4 justify-end">
            <button className="px-6 py-2 border border-white">Trivia & Education</button>
            <button className="px-6 py-2 bg-white text-black font-bold">Data engineering</button>
          </div>
        </div>
      </div>
    </section>
  );
}