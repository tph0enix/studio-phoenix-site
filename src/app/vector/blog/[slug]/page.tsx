import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost } from '@/app/actions/blog';
import VectorNavbar from '@/components/vector/VectorNavbar';
import VectorFooter from '@/components/vector/VectorFooter';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post || !post.published) notFound();

  return (
    <main className="bg-[#000000] min-h-screen font-sans">
      <VectorNavbar />

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">

        {/* Back */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-widest hover:text-white transition-colors mb-12"
        >
          <span className="text-phoenix-orange">←</span> Back to Blog Home
        </Link>

        {/* Header */}
        <div className="mb-12 border-l-2 border-phoenix-orange pl-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
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

          <h1 className="text-4xl md:text-6xl font-inter font-black uppercase tracking-tighter text-bright-white leading-none mb-4">
            {post.title}
          </h1>

          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
            {post.published_at 
              ? new Date(post.published_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
              : '—'
            }
            {' · '}Tristan Phoenix
          </p>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-ash-gray font-light leading-relaxed mb-12 border-b border-white/10 pb-12">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-inter prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
            prose-h2:text-3xl prose-h2:text-bright-white prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:text-phoenix-orange prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-ash-gray prose-p:font-light prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-bright-white prose-strong:font-bold
            prose-em:text-phoenix-orange prose-em:not-italic
            prose-ul:text-ash-gray prose-ul:font-light
            prose-li:mb-2
            prose-a:text-phoenix-orange prose-a:no-underline hover:prose-a:text-bright-white
            prose-blockquote:border-l-2 prose-blockquote:border-phoenix-orange prose-blockquote:pl-6 prose-blockquote:text-ash-gray prose-blockquote:not-italic
            prose-code:text-blue-flame prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer CTA */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-ash-gray text-sm font-light mb-6">
            If this resonated, or if you're dealing with something like this right now, let's talk!
          </p>
          <Link 
            href="/"
            className="inline-block bg-[#13A940] text-black font-inter font-black uppercase text-xs px-8 py-4 tracking-[0.4em] hover:brightness-110 transition-all [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.4))] hover:[filter:drop-shadow(0_0_25px_rgba(19,169,64,0.6))]"
          >
            Book a Discovery Call
          </Link>
        </div>

      </article>

      <VectorFooter />
    </main>
  );
}
