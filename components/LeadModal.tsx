
import React, { useState } from 'react';
import { X, User, Phone, Mail, CheckCircle2, Send, Loader2 } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string;
}

const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

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
    
    // 1. Send to Google Sheets
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source, timestamp: new Date().toISOString() })
      });
    } catch (err) {
      console.error('Lead storage failed:', err);
    }

    // 2. Prepare WhatsApp
    const waText = `*Instant Enquiry Received*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Source:* ${source}`;
    const waUrl = `https://wa.me/919559559272?text=${encodeURIComponent(waText)}`;

    // 3. Trigger WhatsApp & Close
    window.open(waUrl, '_blank');
    setStatus('success');
    
    setTimeout(() => {
      onClose();
      setStatus('idle');
      setFormData({ name: '', phone: '', email: '' });
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative max-w-4xl w-full bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-500 border border-white/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-all z-50 shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Branding Column */}
        <div className="md:w-[42%] bg-[#0056b3] relative overflow-hidden flex flex-col justify-end p-10 md:p-14 text-white">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover scale-110" 
              alt="Background" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0056b3] via-[#0056b3]/90 to-transparent"></div>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0056b3] shadow-2xl mb-4">
              <span className="font-extrabold text-2xl">F</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">Luxury Plots. <br/>Infinite Growth.</h2>
            <p className="text-blue-100 text-sm font-medium leading-relaxed opacity-90">
              Join 1,000+ families who trusted Future Group for their legacy investment.
            </p>
            
            <div className="pt-8 space-y-4">
              {[
                'Government Approved Layouts',
                'Prime Locations only',
                'Appreciation Guaranteed'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md"><CheckCircle2 size={14} className="text-white" /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:w-[58%] p-10 md:p-16 flex flex-col justify-center">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200">
                <CheckCircle2 size={56} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-slate-900">Success!</h3>
                <p className="text-slate-500 font-medium text-sm">Your enquiry is being processed. Closing...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              <div>
                <span className="text-[#0056b3] text-xs font-extrabold uppercase tracking-[0.2em] block mb-2">Priority Access</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Get a Call Back</h3>
                <p className="text-slate-400 text-sm mt-3 font-medium">Leave your details and our senior property consultant will reach out.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all font-semibold"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3 mr-3">
                    <span className="text-slate-400 font-bold text-sm">+91</span>
                  </div>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full pl-24 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all font-semibold"
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all font-semibold"
                  />
                </div>

                <button
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-[#0056b3] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 text-sm active:scale-95 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    'BOOK A SITE VISIT'
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest leading-relaxed">
                  Fast response guaranteed • No Spam
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
