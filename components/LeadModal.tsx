
import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, CheckCircle2, Send } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, triggerSource }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const source = triggerSource || 'Website Popup';
    const waText = `Hello Future Group! I'm interested in your projects (${source}).\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}`;
    const waUrl = `https://wa.me/919559559272?text=${encodeURIComponent(waText)}`;

    try {
      // Simulate backend lead storage
      console.log('Lead Stored:', { ...formData, source });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(err);
    }

    window.open(waUrl, '_blank');
    setStatus('success');
    
    setTimeout(() => {
      onClose();
      setStatus('idle');
      setFormData({ name: '', phone: '', email: '' });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative max-w-4xl w-full bg-white rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all z-50"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image/Branding */}
        <div className="md:w-[45%] bg-[#0056b3] relative overflow-hidden flex flex-col justify-end p-8 md:p-12 text-white">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover" 
              alt="Background" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0056b3] via-[#0056b3]/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Find Your Dream Plot</h2>
            <p className="text-blue-100 text-sm font-medium">India's Largest Plotted Real Estate Developer</p>
            
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} className="text-white" /></div>
                <span className="text-xs font-semibold">100% Clear Titles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} className="text-white" /></div>
                <span className="text-xs font-semibold">5 Year Free Maintenance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} className="text-white" /></div>
                <span className="text-xs font-semibold">24/7 CCTV Surveillance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:w-[55%] p-8 md:p-12">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Enquiry Received!</h3>
              <p className="text-slate-500 text-sm font-medium">Our experts will contact you shortly.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#0056b3] uppercase tracking-wider block mb-1">Enquire Now</span>
                <h3 className="text-2xl font-bold text-slate-900">Get Instant Call Back</h3>
                <p className="text-slate-400 text-xs mt-2 font-medium">Fill the form below and our experts will contact you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all font-medium"
                  />
                </div>
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91 |</span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all font-medium"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address (Optional)"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all font-medium"
                  />
                </div>

                <button
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full bg-[#0056b3] text-white py-4 rounded-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-3 text-sm"
                >
                  {status === 'submitting' ? 'Submitting...' : 'SUBMIT ENQUIRY'}
                </button>

                <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed px-4">
                  By submitting this form, you authorize us to contact you via Call/SMS/WhatsApp.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
