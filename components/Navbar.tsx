
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['Mumbai', 'Navi Mumbai', 'Mumbai 3.0'];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects', hasDropdown: true },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News', path: '/news' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const announcementText = "Enquire for Privacy - +91-9559559272 | Exclusive Villa Plots Available for Viewing";

  return (
    <nav className="fixed w-full z-50">
      {/* Top Infinite Scrolling Bar */}
      <div className="bg-[#0056b3] text-white overflow-hidden whitespace-nowrap py-2 border-b border-blue-400/30">
        <div className="animate-marquee inline-flex">
          <span className="text-[10px] md:text-xs font-semibold px-4">
            {announcementText} &nbsp;&nbsp; | &nbsp;&nbsp; {announcementText} &nbsp;&nbsp; | &nbsp;&nbsp; {announcementText} &nbsp;&nbsp; | &nbsp;&nbsp; {announcementText}
          </span>
          <span className="text-[10px] md:text-xs font-semibold px-4">
            {announcementText} &nbsp;&nbsp; | &nbsp;&nbsp; {announcementText} &nbsp;&nbsp; | &nbsp;&nbsp; {announcementText} &nbsp;&nbsp; | &nbsp;&nbsp; {announcementText}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0056b3] flex items-center justify-center rounded-sm">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#0056b3] font-extrabold leading-none text-xl tracking-tight">Future</span>
                <span className="text-slate-600 font-bold leading-none text-xs">Group</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group h-16 flex items-center"
                  onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`text-sm font-semibold transition-colors flex items-center gap-1 ${isActive(link.path) ? 'text-[#0056b3]' : 'text-slate-700 hover:text-[#0056b3]'}`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Desktop Dropdown */}
                  {link.hasDropdown && (
                    <div className={`absolute top-full left-0 w-56 bg-white shadow-2xl rounded-b-lg py-2 border-t-2 border-[#0056b3] transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            navigate(`/projects?category=${encodeURIComponent(cat)}`);
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-6 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#0056b3] transition-colors font-medium"
                        >
                          {cat}
                        </button>
                      ))}
                      <Link
                        to="/projects"
                        className="block px-6 py-3 text-sm font-bold text-[#0056b3] border-t border-slate-50 mt-1"
                      >
                        View All Projects
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="bg-[#0056b3] text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                Enquire
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <div className="flex items-center justify-between border-b border-slate-50">
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex-grow px-3 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-4 text-slate-400"
                      >
                        <ChevronDown size={20} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {link.hasDropdown && isDropdownOpen && (
                    <div className="bg-slate-50 py-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            navigate(`/projects?category=${encodeURIComponent(cat)}`);
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-10 py-3 text-sm font-medium text-slate-600 hover:text-[#0056b3]"
                        >
                          {cat}
                        </button>
                      ))}
                      <Link
                        to="/projects"
                        onClick={() => setIsOpen(false)}
                        className="block px-10 py-3 text-sm font-bold text-[#0056b3]"
                      >
                        View All Projects
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#0056b3] text-white px-6 py-4 rounded-sm text-sm font-bold mt-4"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
