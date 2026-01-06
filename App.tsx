
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FooterComp from './components/Footer'; 
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import LeadModal from './components/LeadModal';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle first visit popup
  useEffect(() => {
    const hasVisited = localStorage.getItem('future_group_visited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem('future_group_visited', 'true');
      }, 3000); // Show after 3 seconds on first visit
      return () => clearTimeout(timer);
    }
  }, []);

  const whatsappNumber = '919559559272';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<Blog />} />
          <Route path="/news/:id" element={<BlogDetail />} />
        </Routes>
      </main>

      <FooterComp />

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        triggerSource="Auto Popup"
      />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi Future Group, I am interested in your projects.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default App;
