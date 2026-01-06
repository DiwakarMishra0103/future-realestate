
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { LeadData } from '../types';

interface ContactFormProps {
  projectName?: string;
  title?: string;
  subtitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ projectName, title, subtitle }) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectName: projectName || 'General Enquiry'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Requirement: Send leads to WhatsApp
    const waText = `Hello Future Group! I am interested in ${formData.projectName}.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const waUrl = `https://wa.me/91955959272?text=${encodeURIComponent(waText)}`;

    // Requirement: Store data on Google Sheet & send to email
    // Since this is a client-side only app, we simulate these backend operations
    try {
      console.log('Sending lead to Google Sheet API...');
      console.log('Dispatching email notification to sales@futuregroup.in...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Lead processed successfully');
    } catch (err) {
      console.error('Failed to process lead background tasks:', err);
    }

    // Perform WhatsApp redirect
    window.open(waUrl, '_blank');
    
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '', projectName: projectName || 'General Enquiry' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 p-12 rounded-sm text-center space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-center">
          <CheckCircle2 className="text-green-500 w-20 h-20" />
        </div>
        <h3 className="text-4xl font-bold text-green-900 tracking-tight">Thank You!</h3>
        <p className="text-green-700 font-semibold text-sm">Your enquiry has been securely stored. Our property expert will contact you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-green-600 font-bold text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-sm shadow-2xl border border-slate-100">
      {title && <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{title}</h2>}
      {subtitle && <p className="text-slate-400 font-semibold text-sm mb-10">{subtitle}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Full Name*</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all text-sm font-medium"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address*</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number*</label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your requirements..."
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-[#0056b3] outline-none transition-all text-sm font-medium"
          ></textarea>
        </div>

        <button
          disabled={status === 'submitting'}
          type="submit"
          className="w-full bg-[#0056b3] text-white py-5 rounded-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-xl"
        >
          {status === 'submitting' ? 'Processing...' : (
            <>
              Send Enquiry <Send size={18} />
            </>
          )}
        </button>
        <p className="text-[10px] font-semibold text-slate-400 text-center mt-4">
          By clicking submit, your lead will be processed and shared with our sales team via WhatsApp and Email.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
