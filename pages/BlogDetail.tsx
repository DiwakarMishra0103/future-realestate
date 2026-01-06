
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import ContactForm from '../components/ContactForm';
import { ChevronLeft, Calendar, User, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) return <Navigate to="/news" />;

  const shareUrl = window.location.href;
  const shareText = `Read this article: ${post.title}`;
  const otherPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/news" className="flex items-center gap-3 text-slate-500 hover:text-[#0056b3] mb-12 font-bold text-sm transition-colors">
          <ChevronLeft size={18} /> Back to News
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <span className="bg-[#0056b3] text-white text-[10px] font-bold px-4 py-1.5 rounded-sm shadow-lg">{post.category}</span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">{post.title}</h1>
              <div className="flex items-center gap-6 text-slate-400 text-sm font-semibold">
                <div className="flex items-center gap-2"><Calendar size={14} className="text-[#0056b3]" /> {post.date}</div>
                <div className="flex items-center gap-2"><User size={14} className="text-[#0056b3]" /> By {post.author}</div>
              </div>
            </div>

            <div className="rounded-sm overflow-hidden shadow-2xl aspect-video">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-8">
              <p className="text-slate-900 font-bold text-xl leading-relaxed tracking-tight">{post.excerpt}</p>
              <div className="text-slate-500 font-medium text-lg leading-relaxed">
                {post.content}
                <br /><br />
                We believe in creating value beyond bricks and mortar. Our milestones are a testament to the trust our patrons place in us. As we continue to grow, our focus remains unwavering on delivering excellence and building the future of urban living.
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-slate-400">Share Article</span>
                <div className="flex gap-5">
                  <button onClick={shareOnFacebook} className="text-slate-400 hover:text-[#0056b3] transition-all transform hover:scale-110"><Facebook size={22} /></button>
                  <button onClick={shareOnTwitter} className="text-slate-400 hover:text-[#0056b3] transition-all transform hover:scale-110"><Twitter size={22} /></button>
                  <button onClick={shareOnLinkedIn} className="text-slate-400 hover:text-[#0056b3] transition-all transform hover:scale-110"><Linkedin size={22} /></button>
                </div>
              </div>
              <button onClick={handleNativeShare} className="bg-slate-50 p-3 px-5 rounded-sm text-[#0056b3] hover:bg-blue-50 transition-colors flex items-center gap-3 text-xs font-bold">
                <Share2 size={18} /> Copy Link
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-12">
            <div className="sticky top-32 space-y-12">
              <ContactForm title="Get Updates" subtitle="Subscribe to our newsletter for the latest project updates." />
              <div className="bg-slate-50 p-8 rounded-sm border border-slate-100 space-y-8">
                <h4 className="text-sm font-bold text-[#0056b3]">Other News</h4>
                <div className="space-y-8">
                  {otherPosts.map(op => (
                    <Link key={op.id} to={`/news/${op.id}`} className="block group">
                      <div className="text-[10px] font-bold text-slate-400 mb-2">{op.category}</div>
                      <h5 className="font-bold text-slate-900 group-hover:text-[#0056b3] transition-colors leading-tight">{op.title}</h5>
                    </Link>
                  ))}
                </div>
                <Link to="/news" className="block text-center text-[#0056b3] font-bold text-sm pt-6 border-t border-white">View All News</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
