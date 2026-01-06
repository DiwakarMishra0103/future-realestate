
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Phone, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Company Intro */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm">
                <span className="text-[#0056b3] font-bold text-2xl">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold leading-none text-2xl tracking-tight">Future</span>
                <span className="text-blue-400 font-bold leading-none text-xs">Group</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              South India's largest & most trusted real estate developer. We don't just sell plots; we build legacies. Experience excellence with us.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-sm font-bold mb-10 text-blue-400">About Us</h3>
            <ul className="space-y-5 text-slate-400 text-sm font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">Our History</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Leadership Team</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-10 text-blue-400">Quick Links</h3>
            <ul className="space-y-5 text-slate-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">All Projects</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">News & Events</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Accolades */}
          <div>
            <h3 className="text-sm font-bold mb-10 text-blue-400">Accolades</h3>
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center mx-auto mb-3 border border-white/10">
                  🏆
                </div>
                <span className="text-[10px] font-bold text-slate-500">Best Choice 2025</span>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center mx-auto mb-3 border border-white/10">
                  ⭐
                </div>
                <span className="text-[10px] font-bold text-slate-500">Most Trusted Brand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-white rounded-sm p-10 flex flex-col md:flex-row items-center justify-between text-slate-900 gap-10 mb-16 shadow-2xl">
          <div className="text-2xl font-bold tracking-tight">Need assistance?</div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex items-center gap-5">
              <div className="bg-blue-50 p-3 rounded-sm text-[#0056b3]"><Phone size={22} /></div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1">Sales Support</div>
                <div className="text-xl font-bold tracking-tight">+91 955959272</div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-blue-50 p-3 rounded-sm text-[#0056b3]"><Phone size={22} /></div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1">General Enquiry</div>
                <div className="text-xl font-bold tracking-tight">+91 955959272</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[11px] font-medium">
          <p>© 2024 Future Group India Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-10 left-10 bg-white text-slate-900 p-4 rounded-sm shadow-2xl hover:bg-[#0056b3] hover:text-white z-40 transition-all border border-slate-200"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
