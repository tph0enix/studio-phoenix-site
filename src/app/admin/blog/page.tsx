'use client';

import { useState, useEffect } from 'react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/app/actions/blog';

// Simple slug generator
const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Simple markdown to HTML converter for preview
const markdownToHtml = (md: string) => {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/,'<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbulpco])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    .replace(/<p><\/p>/g, '');
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    published: false,
  });

  const loadPosts = async () => {
    const data = await getBlogPosts(false);
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleTitleChange = (title: string) => {
    setForm(f => ({
      ...f,
      title,
      slug: editingPost ? f.slug : slugify(title), // auto-slug only for new posts
    }));
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      tags: post.tags?.join(', ') || '',
      published: post.published,
    });
    setIsEditing(true);
    setIsPreview(false);
  };

  const handleNew = () => {
    setEditingPost(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', tags: '', published: false });
    setIsEditing(true);
    setIsPreview(false);
  };

  const handleSave = async (publish: boolean) => {
    setIsSaving(true);
    const data = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: markdownToHtml(form.content),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: publish,
    };

    if (editingPost) {
      await updateBlogPost(editingPost.post_id, data);
    } else {
      await createBlogPost(data);
    }

    await loadPosts();
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await deleteBlogPost(id);
    await loadPosts();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-8">
      
      {!isEditing ? (
        <>
          {/* Post List */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div className="border-l-2 border-phoenix-orange pl-5">
                <p className="text-phoenix-orange font-mono text-[9px] font-black tracking-[0.4em] uppercase mb-1">Admin</p>
                <h1 className="text-3xl font-inter font-black uppercase tracking-tighter">Blog Posts</h1>
              </div>
              <button
                onClick={handleNew}
                className="bg-[#13A940] text-black font-inter font-black uppercase text-xs px-6 py-3 tracking-[0.3em] hover:brightness-110 transition-all cursor-pointer"
              >
                + New Post
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="border border-dashed border-white/10 py-20 text-center">
                <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest">No posts yet.</p>
              </div>
            ) : (
              <div className="space-y-0">
                {posts.map(post => (
                  <div key={post.post_id} className="border-t border-white/10 py-6 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 border ${
                          post.published 
                            ? 'text-[#13A940] border-[#13A940]/30' 
                            : 'text-white/30 border-white/10'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        {post.tags?.map((tag: string) => (
                          <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-blue-flame border border-blue-flame/30 px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-lg font-inter font-black uppercase tracking-tighter text-bright-white">{post.title}</h2>
                      <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mt-1">/{post.slug}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-[9px] text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.post_id)}
                        className="text-[9px] text-red-400/60 uppercase tracking-widest hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/10" />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Editor */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="border-l-2 border-phoenix-orange pl-5">
                <p className="text-phoenix-orange font-mono text-[9px] font-black tracking-[0.4em] uppercase mb-1">Admin / Blog</p>
                <h1 className="text-3xl font-inter font-black uppercase tracking-tighter">
                  {editingPost ? 'Edit Post' : 'New Post'}
                </h1>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[9px] text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>
            </div>

            <div className="space-y-6">

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] text-white uppercase tracking-widest font-bold">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Why manual effort is a bug, not a feature"
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white text-lg font-inter font-bold outline-none focus:border-phoenix-orange transition-colors"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <label className="text-[10px] text-white uppercase tracking-widest font-bold">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="why-manual-effort-is-a-bug"
                  className="w-full bg-black border border-white/20 px-4 py-2 text-white font-mono text-sm outline-none focus:border-phoenix-orange transition-colors"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="text-[10px] text-white uppercase tracking-widest font-bold">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="One sentence that makes them click."
                  rows={2}
                  className="w-full bg-black border border-white/20 px-4 py-2 text-white font-sans text-sm outline-none focus:border-phoenix-orange transition-colors resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="text-[10px] text-white uppercase tracking-widest font-bold">Tags <span className="text-white/30 normal-case tracking-normal font-normal">(comma separated)</span></label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  placeholder="Automation, Power BI, Data Governance"
                  className="w-full bg-black border border-white/20 px-4 py-2 text-white font-sans text-sm outline-none focus:border-phoenix-orange transition-colors"
                />
              </div>

              {/* Content + Preview Toggle */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-white uppercase tracking-widest font-bold">Content <span className="text-white/30 normal-case tracking-normal font-normal">(Markdown)</span></label>
                  <button
                    type="button"
                    onClick={() => setIsPreview(p => !p)}
                    className="text-[9px] text-phoenix-orange uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                  >
                    {isPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>

                {isPreview ? (
                  <div 
                    className="w-full bg-black border border-white/20 px-6 py-4 min-h-[400px] prose prose-invert prose-sm max-w-none
                      prose-headings:font-inter prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                      prose-h2:text-2xl prose-h2:text-bright-white
                      prose-h3:text-lg prose-h3:text-phoenix-orange
                      prose-p:text-ash-gray prose-p:font-light
                      prose-strong:text-bright-white
                      prose-em:text-phoenix-orange prose-em:not-italic
                      prose-code:text-blue-flame prose-code:bg-white/5 prose-code:px-1 prose-code:rounded-none
                      prose-blockquote:border-l-2 prose-blockquote:border-phoenix-orange prose-blockquote:pl-4 prose-blockquote:text-ash-gray
                    "
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(form.content) }}
                  />
                ) : (
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    placeholder="Write in Markdown. ## for headings, **bold**, *orange*, `code`, > blockquote"
                    rows={20}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white font-mono text-sm outline-none focus:border-phoenix-orange transition-colors resize-y leading-relaxed"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving || !form.title || !form.content}
                  className={`flex-1 font-inter font-black uppercase text-xs py-4 tracking-[0.4em] transition-all
                    ${!isSaving && form.title && form.content
                      ? "bg-[#13A940] text-black cursor-pointer hover:brightness-110 [filter:drop-shadow(0_0_15px_rgba(19,169,64,0.4))]"
                      : "bg-[#13A940]/30 text-black/40 cursor-not-allowed"
                    }
                  `}
                >
                  {isSaving ? 'Saving...' : 'Publish'}
                </button>
                <button
                  onClick={() => handleSave(false)}
                  disabled={isSaving || !form.title || !form.content}
                  className={`flex-1 font-inter font-black uppercase text-xs py-4 tracking-[0.4em] transition-all border
                    ${!isSaving && form.title && form.content
                      ? "border-white/20 text-white cursor-pointer hover:border-phoenix-orange hover:text-phoenix-orange transition-all duration-300"
                      : "border-white/5 text-white/20 cursor-not-allowed"
                    }
                  `}
                >
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
