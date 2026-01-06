
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS, ACHIEVEMENTS, BLOG_POSTS, getIcon } from '../constants';
import ContactForm from '../components/ContactForm';
import LeadModal from '../components/LeadModal';
import { ChevronRight, Play, FileText, Calendar, ChevronLeft, ArrowRight, MapPin, Download, ShieldCheck, Globe, TrendingUp, Layers } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
    title: "Building Future. Defining Excellence.",
    subtitle: "Discover the finest plotted real estate across India's most vibrant cities."
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
    title: "Your Vision. Our Masterpiece.",
    subtitle: "Premium luxury plots designed for the next generation of homeowners."
  },
  {
    image: "https://images.unsplash.com/photo-1449156059431-787c5d71d90a?auto=format&fit=crop&q=80&w=2000",
    title: "Invest in Growth. Own the Legacy.",
    subtitle: "Strategically located assets in high-growth corridors of Mumbai and beyond."
  }
];

const GALLERY_PREVIEW_IMAGES = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1449156059431-787c5d71d90a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
];

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Mumbai');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const filteredProjects = PROJECTS.filter(p => p.category === activeCategory);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % (GALLERY_PREVIEW_IMAGES.length - 2));
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % (GALLERY_PREVIEW_IMAGES.length - 2));
  };

  const prevGallery = () => {
    setGalleryIndex((prev) => (prev - 1 + (GALLERY_PREVIEW_IMAGES.length - 2)) % (GALLERY_PREVIEW_IMAGES.length - 2));
  };

  return (
    <div className="pt-20">
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        triggerSource="Brochure Download" 
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-slate-900">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover scale-105 animate-[ken-burns_20s_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
              <div className="text-center text-white space-y-6 max-w-5xl">
                <div className="inline-block px-4 py-1 bg-[#0056b3] text-[10px] font-bold rounded-sm shadow-lg">
                  World Class Real Estate
                </div>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight drop-shadow-2xl leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-xl font-medium drop-shadow-md text-slate-100 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link to="/projects" className="bg-white text-[#0056b3] px-8 py-4 rounded-sm font-bold text-sm hover:bg-[#0056b3] hover:text-white transition-all shadow-xl">
                    View Projects
                  </Link>
                  <button onClick={() => setIsModalOpen(true)} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-sm font-bold text-sm hover:bg-white hover:text-slate-900 transition-all">
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all hidden md:block">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all hidden md:block">
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Achievements</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium text-sm">A legacy of trust and excellence since our inception</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.id} className="text-center space-y-2 group cursor-default">
                <div className="w-16 h-16 bg-blue-50 text-[#0056b3] rounded-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0056b3] group-hover:text-white transition-all duration-300">
                  {getIcon(item.icon, 24)}
                </div>
                <div className="text-4xl font-bold text-slate-900 tracking-tight">{item.value}</div>
                <div className="text-sm font-semibold text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Are Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Our Vision" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-50 -z-0 rounded-sm"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#0056b3] opacity-10 rounded-sm"></div>
            </div>
            <div className="space-y-8">
              <div className="text-[#0056b3] text-sm font-bold">What We Are</div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">A Legacy of Trust in Plotted Development</h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Future Group is more than a real estate developer; we are creators of possibilities. With over a decade of expertise, we have pioneered the art of curated plotted developments, focusing on legal transparency, strategic location selection, and sustainable infrastructure.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#0056b3]"><ShieldCheck size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Uncompromising Integrity</h4>
                    <p className="text-sm text-slate-500">Every plot we offer comes with cleared titles and verified documentation for complete peace of mind.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#0056b3]"><Globe size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Strategic Locations</h4>
                    <p className="text-sm text-slate-500">We invest in corridors of high growth, ensuring your investment appreciates as the city evolves.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="text-[#0056b3] text-sm font-bold">What We Do</div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">Our Core Services</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Plotted Development', 
                desc: 'We specialize in master-planned communities that offer individual plot ownership with urban amenities.', 
                icon: <Layers size={32} /> 
              },
              { 
                title: 'Strategic Investment', 
                desc: 'Our analysts identify upcoming hubs to provide high-yield real estate investment opportunities.', 
                icon: <TrendingUp size={32} /> 
              },
              { 
                title: 'Infrastructure Building', 
                desc: 'We go beyond selling land by providing roads, water, electricity, and green spaces in every project.', 
                icon: <MapPin size={32} /> 
              },
              { 
                title: 'Legal Advisory', 
                desc: 'Transparent end-to-end legal support for documentation and registration of your dream asset.', 
                icon: <ShieldCheck size={32} /> 
              }
            ].map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-sm border border-slate-100 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="text-[#0056b3] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Your Home. Your Dream. Your Choice.</h2>
            <p className="text-slate-500 font-medium text-sm mb-10">Choose your plot from India's largest plotted real estate developer</p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['Mumbai', 'Navi Mumbai', 'Mumbai 3.0'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-sm text-sm font-semibold transition-all ${
                    activeCategory === cat ? 'bg-[#0056b3] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-[#0056b3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-sm overflow-hidden shadow-xl border border-slate-100 group">
                <div className="relative h-72 overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-[#0056b3] text-white text-[10px] font-bold px-4 py-1.5 rounded-sm shadow-lg">{project.status}</div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-bold text-[#0056b3] mb-2">Future Group Project</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-6">
                    <MapPin size={16} className="text-[#0056b3]" /> {project.location}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8 text-sm border-t border-slate-50 pt-6">
                    <div>
                      <div className="text-slate-400 font-bold mb-1">Plot Sizes</div>
                      <div className="font-bold text-slate-900">{project.plotSize}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold mb-1">Base Rate</div>
                      <div className="font-bold text-slate-900">{project.rate}</div>
                    </div>
                  </div>
                  <Link to={`/projects/${project.id}`} className="block w-full text-center bg-slate-900 text-white py-4 rounded-sm font-bold hover:bg-[#0056b3] transition-all text-sm">Know More</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => navigate(`/projects?category=${encodeURIComponent(activeCategory)}`)} className="border-2 border-[#0056b3] text-[#0056b3] px-10 py-4 rounded-sm text-sm font-bold hover:bg-[#0056b3] hover:text-white transition-all flex items-center gap-3 mx-auto">
              View All {activeCategory} Projects <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <div className="text-[#0056b3] text-sm font-bold mb-2">Visuals</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Our Gallery</h2>
            </div>
            <Link to="/gallery" className="text-[#0056b3] font-bold text-sm flex items-center gap-2 border-b-2 border-[#0056b3] pb-1 hover:gap-4 transition-all">
              Explore Full Gallery <ChevronRight size={16} />
            </Link>
          </div>
          <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${galleryIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%)` }}>
              {GALLERY_PREVIEW_IMAGES.map((img, i) => (
                <div key={i} className="w-full md:w-1/3 flex-shrink-0 px-2">
                  <div className="aspect-[4/3] bg-slate-100 rounded-sm overflow-hidden group shadow-lg">
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={`Gallery ${i}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10 gap-4">
              <button onClick={prevGallery} className="bg-slate-100 p-4 rounded-sm hover:bg-[#0056b3] hover:text-white transition-all text-slate-400">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextGallery} className="bg-slate-100 p-4 rounded-sm hover:bg-[#0056b3] hover:text-white transition-all text-slate-400">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Updates */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <div className="text-blue-400 text-sm font-bold mb-2">Newsroom</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Latest Updates</h2>
            </div>
            <Link to="/news" className="text-white font-bold text-sm flex items-center gap-2 border-b-2 border-white pb-1 hover:gap-4 transition-all">
              View All News <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/news/${post.id}`} className="group space-y-4">
                <div className="aspect-video bg-white/5 overflow-hidden rounded-sm">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={post.title} />
                </div>
                <div className="text-blue-400 text-[10px] font-bold">{post.category}</div>
                <h3 className="text-white text-xl font-bold group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <p className="text-slate-400 text-sm font-medium line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Background Texture" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 md:p-20 rounded-sm flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="text-white space-y-6 max-w-2xl">
              <div className="flex items-center gap-3 text-blue-200 text-sm font-bold">
                <FileText size={20} /> Corporate Presentation
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">View Our Journey Brochure</h2>
              <p className="text-blue-50 text-lg font-medium leading-relaxed">
                Discover the legacy of Future Group. Download our comprehensive brochure to learn about our master-planned communities, future roadmap, and core philosophies that drive us.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-white text-blue-600 px-12 py-6 rounded-sm font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                Download Brochure <Download size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="text-[#0056b3] text-sm font-bold mb-2">Get Connected</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Connect with Us</h2>
            <div className="w-12 h-1 bg-slate-900 mx-auto mt-6 mb-4"></div>
            <p className="text-slate-400 font-medium text-sm">We are here to help you reach your goals</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="bg-slate-50 p-10 rounded-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">General Enquiry</h3>
                <p className="text-slate-500 font-medium text-sm mb-10">Get in touch with our experts</p>
                <div className="aspect-[4/3] rounded-sm overflow-hidden mb-10 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800" alt="Connect" className="w-full h-full object-cover" />
                </div>
              </div>
              <Link to="/contact" className="w-full bg-[#0056b3] text-white py-5 rounded-sm font-bold text-center hover:bg-blue-700 transition-colors text-sm">Contact Us Now</Link>
            </div>
            <div className="lg:col-span-2">
              <ContactForm title="Send Us a Message" subtitle="Fill out the form below and our property expert will reach out to you." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
