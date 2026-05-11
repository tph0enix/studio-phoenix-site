import Link from 'next/link';
import { getBlogPosts } from '@/app/actions/blog';
import VectorNavbar from '@/components/vector/VectorNavbar';
import VectorFooter from '@/components/vector/VectorFooter';

export const metadata = {
  title: 'Blog | Vector by Studio Phoenix',
  description: 'Data engineering insights, tips, and philosophy from Tristan Phoenix.',
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts(true);

  return (
    <main className="bg-[#000000] min-h-screen font-sans">
      <VectorNavbar />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">

        {/* Header */}
        <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-inter font-black uppercase tracking-tighter text-bright-white leading-none mb-6">
            The <span className="text-phoenix-orange">Signalflare.</span>
            </h1>
            <p className="text-ash-gray text-lg font-light max-w-xl leading-relaxed">
            From spreadsheet ash rises a spark of insight. 
            <br /><span className="text-xs">And maybe a work-free lunch break.</span>
            </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="border border-dashed border-white/10 py-20 text-center">
            <p className="text-white/50 font-mono text-[10px] uppercase tracking-widest">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, i) => (
              <Link 
                key={post.post_id} 
                href={`/blog/${post.slug}`}
                className="group block border-t border-white/10 py-8 hover:border-phoenix-orange transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-grow">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags.map((tag: string) => (
                          <span 
                            key={tag}
                            className="text-[9px] font-mono uppercase tracking-widest text-blue-flame border border-blue-flame/30 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-inter font-black uppercase tracking-tighter text-bright-white group-hover:text-phoenix-orange transition-colors duration-300 leading-tight mb-3">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-ash-gray text-sm font-light leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Date + Arrow */}
                  <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0">
                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest whitespace-nowrap">
                      {post.published_at 
                        ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'
                      }
                    </p>
                    <span className="text-phoenix-orange text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
            {/* Bottom border */}
            <div className="border-t border-white/10" />
          </div>
        )}
      </section>

      <VectorFooter />
    </main>
  );
}
