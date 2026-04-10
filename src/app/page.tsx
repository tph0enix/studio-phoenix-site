export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* TOP VIEWPORT: shortest paths to establish outflow contact & cashflow */}
      <section className="min-h-screen grid grid-cols-3 grid-rows-[auto_1fr_auto] px-8 py-6 gap-6">
        {/* top left: establish cashflow */}
        <div className="col-start-1 row-start-1 flex flex-col items-start gap-4">
          <button className="text-left">Manga</button>
          <button className="text-left">Merch</button>
          <button className="text-left">Funding / Support</button>
        </div>

        {/* top middle: logo & motto */}
        <div className="col-start-2 row-start-1 flex flex-col items-center gap-2">
          <div className="text-3xl font-semibold">Studio Phoenix</div>
          <div className="text-sm tracking-wide">[Beauty. Reborn.]</div>
        </div>

        {/* top right: establish outflow contact */}
        <div className="col-start-3 row-start-1 flex flex-col items-end gap-4">
          <button>Log In</button>
          <button>Sign Up</button>
          <button>Social Bridge</button>
        </div>

        {/* middle: faceless hero & dedication in center, Tris on right */}
        <div className="col-start-1 col-span-3 row-start-2 grid grid-cols-3 items-center gap-6">
          <div />

          <div className="flex flex-col items-center gap-4">
            <div className="w-56 h-72 border border-white/20 flex items-center justify-center">
              Faceless Hero
            </div>
            <div className="border border-white/20 px-4 py-2">Dedication</div>
            <div className="w-64 h-28 border border-white/20 flex items-center justify-center">
              Current Events
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-52 h-72 border border-white/20 flex items-center justify-center">
              Tris
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE VIEWPORTS: motivation to hit 1st-priority items */}
      <section className="min-h-screen px-8 py-12 flex flex-col gap-12">
        <div className="border border-white/20 p-6">Who We Are</div>
        <div className="border border-white/20 p-6">Trivia</div>
        <div className="border border-white/20 p-6">Tris (varies)</div>
      </section>

      {/* LAST VIEWPORT: low-use but needed items */}
      <section className="min-h-screen px-8 py-12 grid grid-cols-3 gap-8 items-start">
        <div className="border border-white/20 p-6">Tris (bottom left)</div>
        <div className="border border-white/20 p-6">About Me</div>
        <div className="border border-white/20 p-6 flex flex-col gap-3">
          <div>Legal / Policy / Privacy / Copyright</div>
          <div>Contact</div>
        </div>
      </section>
    </div>
  );
}
