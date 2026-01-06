
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import ContactForm from '../components/ContactForm';
import { ChevronLeft, MapPin, Ruler, CheckCircle, Info, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) return <Navigate to="/" />;

  const shareUrl = window.location.href;
  const shareText = `Check out this amazing project: ${project.name} at ${project.location}`;

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
          title: project.name,
          text: shareText,
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
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/" className="flex items-center gap-3 text-slate-500 hover:text-[#0056b3] mb-12 font-bold text-sm transition-colors">
          <ChevronLeft size={18} /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="bg-[#0056b3] text-white text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-lg">{project.status}</span>
                <span className="text-[#0056b3] text-sm font-bold">Future Group Project</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight">{project.name}</h1>
              <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm">
                <MapPin size={20} className="text-[#0056b3]" /> {project.location}
              </div>
            </div>

            <div className="rounded-sm overflow-hidden shadow-2xl transition-all duration-1000">
              <img src={project.image} alt={project.name} className="w-full aspect-video object-cover" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Plot Size', val: project.plotSize, icon: <Ruler size={24} /> },
                { label: 'Base Rate', val: project.rate, icon: <Info size={24} /> },
                { label: 'Possession', val: '2026 Q4', icon: <CheckCircle size={24} /> },
                { label: 'Inventory', val: 'Limited', icon: <CheckCircle size={24} /> },
              ].map((spec, i) => (
                <div key={i} className="bg-white p-8 rounded-sm border border-slate-100 shadow-xl">
                  <div className="text-[#0056b3] mb-4">{spec.icon}</div>
                  <div className="text-sm font-bold text-slate-400 mb-1">{spec.label}</div>
                  <div className="text-xl font-bold text-slate-900 tracking-tight">{spec.val}</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-12 rounded-sm border border-slate-100 shadow-xl space-y-8">
              <h3 className="text-3xl font-bold">About the Project</h3>
              <p className="text-slate-500 leading-relaxed text-lg font-medium">
                {project.description} Our meticulously planned plots offer the perfect blend of natural beauty and urban convenience. 
                With premium amenities including clubhouse, swimming pool, landscaped gardens, and 24/7 security, your future home is designed for excellence.
              </p>

              <div className="pt-10 border-t border-slate-50 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-slate-400">Share Property</span>
                  <div className="flex gap-5">
                    <button onClick={shareOnFacebook} className="text-slate-400 hover:text-[#0056b3] transition-all transform hover:scale-110"><Facebook size={22} /></button>
                    <button onClick={shareOnTwitter} className="text-slate-400 hover:text-[#0056b3] transition-all transform hover:scale-110"><Twitter size={22} /></button>
                    <button onClick={shareOnLinkedIn} className="text-slate-400 hover:text-[#0056b3] transition-all transform hover:scale-110"><Linkedin size={22} /></button>
                  </div>
                </div>
                <button 
                  onClick={handleNativeShare}
                  className="bg-slate-900 text-white px-8 py-3 rounded-sm font-bold text-xs hover:bg-[#0056b3] transition-all flex items-center gap-3 shadow-lg"
                >
                  <Share2 size={16} /> Copy Link
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <ContactForm 
                projectName={project.name} 
                title="Enquire Now" 
                subtitle={`Express interest in ${project.name}`} 
              />
              
              <div className="mt-10 bg-slate-900 p-8 rounded-sm text-white shadow-2xl">
                <h4 className="font-bold mb-6 text-sm text-blue-400">Direct Support</h4>
                <div className="space-y-6">
                  <a href="tel:+91955959272" className="flex items-center gap-4 hover:text-blue-400 transition-colors group">
                    <div className="bg-white/5 p-3 rounded-sm group-hover:bg-[#0056b3] transition-all"><Info size={18}/></div>
                    <div className="text-xl font-bold tracking-tight">+91 955959272</div>
                  </a>
                  <a href="https://wa.me/91955959272" className="flex items-center gap-4 hover:text-green-400 transition-colors group">
                    <div className="bg-white/5 p-3 rounded-sm group-hover:bg-green-600 transition-all text-green-400"><Info size={18}/></div>
                    <div className="text-xl font-bold tracking-tight">WhatsApp Expert</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
