
import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="text-[#0056b3] text-sm font-bold mb-4">Contact Us</div>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight">Get in Touch</h1>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto font-semibold text-sm">
            Have questions about our projects? Our real estate experts are here to help you make the best decision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-12">
            <div className="bg-slate-900 text-white p-10 rounded-sm shadow-2xl space-y-10">
              <div className="flex gap-6">
                <div className="bg-[#0056b3] p-4 rounded-sm h-fit">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-1">Call Us</div>
                  <div className="text-2xl font-bold tracking-tight">+91 955959272</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#0056b3] p-4 rounded-sm h-fit">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-1">Email Us</div>
                  <div className="text-2xl font-bold tracking-tight">info@futuregroup.in</div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#0056b3] p-4 rounded-sm h-fit">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-1">Visit Us</div>
                  <div className="text-lg font-bold tracking-tight leading-tight">
                    Future House, Plot No. 45, <br/>
                    Chembur East, Mumbai, <br/>
                    Maharashtra 400071
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#0056b3] p-4 rounded-sm h-fit">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-1">Hours</div>
                  <div className="text-xl font-bold tracking-tight">Mon - Sat: 9am - 7pm</div>
                </div>
              </div>
            </div>

            <div className="h-80 rounded-sm overflow-hidden shadow-2xl border border-slate-100 relative group">
               <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=800" alt="Map" className="w-full h-full object-cover transition-all duration-700" />
               <div className="absolute inset-0 bg-[#0056b3]/20 flex items-center justify-center">
                 <div className="bg-white px-8 py-4 rounded-sm shadow-2xl font-bold text-slate-900 text-sm flex items-center gap-3">
                   <MapPin size={18}/> View on Google Maps
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm 
              title="Let's Start a Conversation" 
              subtitle="Fill out the form below and we'll get back to you within 24 hours." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
