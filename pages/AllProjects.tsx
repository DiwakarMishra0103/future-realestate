
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { MapPin, Search, Ruler, IndianRupee, X, ArrowRight, ExternalLink } from 'lucide-react';

const AllProjects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory.toUpperCase());
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [rateFilter, setRateFilter] = useState('');

  const categories = ['All', 'Mumbai', 'Navi Mumbai', 'Mumbai 3.0'];

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCategory = activeCategory === 'ALL' || p.category.toUpperCase() === activeCategory;
    
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSize = sizeFilter === '' || p.plotSize.toLowerCase().includes(sizeFilter.toLowerCase());
    const matchesRate = rateFilter === '' || p.rate.toLowerCase().includes(rateFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesSize && matchesRate;
  });

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat.toUpperCase());
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    const upperCat = cat.toUpperCase();
    setActiveCategory(upperCat);
    if (upperCat === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSizeFilter('');
    setRateFilter('');
    handleCategoryChange('All');
  };

  return (
    <div className="pt-32 pb-24 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0056b3] text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] animate-pulse"></span>
            Curated Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Explore Premium Plots
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base leading-relaxed">
            Discover India's most strategically located assets. From Mumbai's core to the growth corridors of 3.0, find your perfect investment.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl shadow-slate-200/50 mb-16 border border-slate-100 sticky top-24 z-30">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-grow md:flex-grow-0 px-6 py-3 rounded-lg text-xs font-bold transition-all duration-300 border ${
                    activeCategory === cat.toUpperCase() 
                      ? 'bg-[#0056b3] text-white border-[#0056b3] shadow-lg shadow-blue-200' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-[#0056b3] hover:text-[#0056b3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Inputs Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search Location..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-medium"
                />
              </div>

              <div className="relative group">
                <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Min Plot Size..." 
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-medium"
                />
              </div>

              <div className="relative group">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Budget Range..." 
                  value={rateFilter}
                  onChange={(e) => setRateFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {(searchQuery || sizeFilter || rateFilter || activeCategory !== 'ALL') && (
              <button 
                onClick={clearFilters}
                className="shrink-0 flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-xs transition-colors p-2"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60"></div>
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-[#0056b3] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                      {project.status}
                    </span>
                    <span className="bg-white/90 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-medium">
                      <MapPin size={12} className="text-blue-400" />
                      {project.location}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  
                  <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 mt-auto border-t border-slate-50 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#0056b3]">
                        <Ruler size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Area</p>
                        <p className="text-sm font-bold text-slate-900">{project.plotSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <IndianRupee size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting</p>
                        <p className="text-sm font-bold text-slate-900">{project.rate}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <Link 
                    to={`/projects/${project.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-[#0056b3] transition-all duration-300 text-xs shadow-lg shadow-slate-200 group/btn"
                  >
                    View Project Details
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-24 text-center shadow-xl border border-slate-100 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-8">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">No Matching Projects</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">
              We couldn't find any results for your current filters. Try adjusting your search criteria or explore other categories.
            </p>
            <button 
              onClick={clearFilters}
              className="px-10 py-4 bg-[#0056b3] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 mx-auto"
            >
              <X size={16} /> Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Contact Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <div className="bg-gradient-to-r from-[#0056b3] to-blue-800 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h4>
            <p className="text-blue-100 text-sm md:text-base font-medium">
              Our property experts have access to off-market inventory and upcoming pre-launches. Connect with us for a personalized consultation.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/contact" className="px-10 py-4 bg-white text-[#0056b3] rounded-xl font-bold text-sm hover:bg-blue-50 transition-all text-center shadow-xl">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
