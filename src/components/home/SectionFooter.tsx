export default function SectionFooter() {
  return (
    <footer className="min-h-screen flex flex-col items-center justify-end px-6 pb-12 relative">
      
      {/* MANIFESTO FINALE */}
      <div className="max-w-2xl text-center mb-24">
        <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase">Real. Beautiful.</h2>
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed mb-12">
          <p>
            We don't want to conquer the world: we just want to build a better version of it. 
            One that values precision and soul. One humanity deserves (despite what clickbait 
            & social media comments say).
          </p>
          <p>
            It's not perfect, but it's real, and that's what makes it beautiful. 
            So if you're tired of the slop and ready for something real-born like millions 
            of others ready for change—stay a while!
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email" 
            className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-white outline-none focus:border-orange-500 flex-grow"
          />
          <button className="bg-orange-600 px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-orange-500 transition-all">
            Stay in Orbit
          </button>
        </form>
      </div>

      {/* THE ACTUAL FOOTER NAV (The part I missed) */}
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-zinc-900 pt-16 mb-16 text-sm">
        
        {/* MEANING */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white uppercase tracking-widest">Meaning</h4>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Original Manga</a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Publishing</a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Studio Phoenix Art</a>
        </div>

        {/* TRUTH */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white uppercase tracking-widest">Truth</h4>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Trivia & Education</a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Data Engineering</a>
          <a href="/admin/trivia" className="text-zinc-500 hover:text-orange-500 transition-colors">Trivia Editor</a>
        </div>

        {/* UTILITY/ADMIN */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white uppercase tracking-widest">System</h4>
          <a href="/admin/branding" className="text-zinc-500 hover:text-orange-500 transition-colors">Branding</a>
          <a href="/admin/scheduler" className="text-zinc-500 hover:text-orange-500 transition-colors">Scheduler</a>
          <a href="/admin/notes" className="text-zinc-500 hover:text-orange-500 transition-colors">Internal Notes</a>
        </div>

        {/* SOCIAL/LEGAL */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white uppercase tracking-widest">Connect</h4>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">X / Twitter</a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Instagram</a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Privacy Policy</a>
        </div>
      </div>

      {/* FINAL SIGNATURE */}
      <div className="w-full text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
        <p>© 2026 Studio Phoenix — Made with <span className="text-red-600">pixel heart</span> by Tristan</p>
      </div>
    </footer>
  );
}