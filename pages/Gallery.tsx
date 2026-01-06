
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const categories = ['All', 'Mumbai', 'Navi Mumbai', 'Mumbai 3.0', 'Construction', 'Lifestyle'];
  const [activeFilter, setActiveFilter] = useState('All');

  const galleryItems = [
    { url: PROJECTS[0].image, category: 'Mumbai', title: 'Arham Morya Exterior' },
    { url: PROJECTS[1].image, category: 'Navi Mumbai', title: 'Visa to Mumbai 3.0' },
    { url: PROJECTS[2].image, category: 'Mumbai 3.0', title: 'Emerald Heights' },
    { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800', category: 'Construction', title: 'Site Progress Phase 1' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', category: 'Lifestyle', title: 'Modern Clubhouse' },
    { url: 'https://images.unsplash.com/photo-1449156059431-787c5d71d90a?auto=format&fit=crop&q=80&w=800', category: 'Lifestyle', title: 'Luxury Interiors' },
    { url: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800', category: 'Construction', title: 'Foundation Works' },
    { url: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800', category: 'Mumbai', title: 'Project Skyline' },
    { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', category: 'Mumbai 3.0', title: 'Premium Plots' },
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'All' || item.category === activeFilter
  );

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="text-[#0056b3] text-sm font-bold mb-4">Visual Journey</div>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">Our Gallery</h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-semibold text-sm">A glimpse into our architectural marvels and construction progress.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-sm text-sm font-bold transition-all ${
                activeFilter === cat 
                  ? 'bg-[#0056b3] text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden bg-slate-100 rounded-sm cursor-pointer shadow-lg">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-all duration-700" />
              <div className="absolute inset-0 bg-[#0056b3]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center">
                <Maximize2 className="text-white mb-4" size={32} />
                <h3 className="text-white font-bold text-xl mb-2 tracking-tight">{item.title}</h3>
                <span className="text-blue-200 text-sm font-semibold">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-sm">
            <ImageIcon className="mx-auto text-slate-200 mb-6" size={64} />
            <h3 className="text-2xl font-bold text-slate-900">No Images Found</h3>
            <p className="text-slate-400 font-semibold text-sm mt-2">We are constantly updating our collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
