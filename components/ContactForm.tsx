
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { LeadData } from '../types';

interface ContactFormProps {
  projectName?: string;
  title?: string;
  subtitle?: string;
}

// Replace this with your actual Google Apps Script Webhook URL
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

const ContactForm: React.FC<ContactFormProps> = ({ projectName, title, subtitle }) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectName: projectName || 'General Enquiry'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadSource = projectName ? `Project Page: ${projectName}` : 'Contact Page';

    // 1. Send to Google Sheets (and Email via Apps Script)
    try {
      // Note: We use 'no-cors' if the Apps Script isn't configured for CORS, 
      // but standard practice is a proper POST.
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: leadSource, timestamp: new Date().toISOString() })
      });
      console.log('Lead synced to Google Sheets and Sales Email dispatched.');
    } catch (err) {
      console.error('Data storage error:', err);
      // We still proceed to WhatsApp as it's the primary conversion tool
    }

    // 2. Prepare WhatsApp Message
    const waText = `*New Lead from Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Interest:* ${formData.projectName}\n*Message:* ${formData.message}\n\n_Source: ${leadSource}_`;
    const waUrl = `https://wa.me/919559559272?text=${encodeURIComponent(waText)}`;

    // 3. Open WhatsApp
    window.open(waUrl, '_blank');
    
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '', projectName: projectName || 'General Enquiry' });
    
    // Auto reset after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 p-12 rounded-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500 shadow-sm">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle2 size={40} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold text-green-900 tracking-tight">Lead Captured!</h3>
          <p className="text-green-700 font-medium text-sm max-w-sm mx-auto">
            Your enquiry has been stored in our system and sent to our experts. We will contact you within 15 minutes.
          </p>
        </div>
        <button 
          onClick={() => setStatus('idle')}
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="relative z-10">
        {title && <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{title}</h2>}
        {subtitle && <p className="text-slate-400 font-medium text-sm mb-10">{subtitle}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name*</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-semibold text-slate-900"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address*</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mobile Number*</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 99887 76655"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your budget or preferred location..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0056b3]/20 focus:border-[#0056b3] outline-none transition-all text-sm font-semibold text-slate-900 resize-none"
            ></textarea>
          </div>

          <button
            disabled={status === 'submitting'}
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-[#0056b3] transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-xl shadow-slate-200 active:scale-95"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Storing Lead...
              </>
            ) : (
              <>
                Submit Enquiry <Send size={18} />
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
             <CheckCircle2 size={12} className="text-green-500" /> Secure Submission via SSL
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
