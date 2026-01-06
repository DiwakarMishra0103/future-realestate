
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Construction Update', 'Market News', 'Event'];

  const filteredPosts = BLOG_POSTS.filter(post => 
    filter === 'All' || post.category.toUpperCase() === filter.toUpperCase()
  );

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="text-[#0056b3] text-sm font-bold mb-4">Latest Updates</div>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">News & Insights</h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-semibold text-sm">Stay informed about the real estate landscape and our project milestones.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-sm text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-[#0056b3] text-white shadow-lg' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-[#0056b3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/news/${post.id}`}
              className="group bg-white rounded-sm overflow-hidden shadow-2xl border border-slate-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-all duration-700" />
                <div className="absolute top-6 left-6 bg-[#0056b3] text-white text-[10px] font-bold px-4 py-1.5 rounded-sm shadow-lg">
                  {post.category}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold mb-4">
                  <div className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0056b3]" /> {post.date}</div>
                  <div className="flex items-center gap-1.5"><User size={12} className="text-[#0056b3]" /> {post.author}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-[#0056b3] transition-colors">{post.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">{post.excerpt}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-2 text-[#0056b3] text-sm font-bold">
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
