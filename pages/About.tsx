
import React from 'react';
import { ShieldCheck, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="text-[#0056b3] text-sm font-bold">About Future Group</div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">We build spaces that inspire dreams</h1>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Founded over a decade ago, Future Group has grown to become India's leading plotted real estate developer. Our commitment to transparency, quality, and timely delivery has earned us the trust of over 1000 happy families.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
              <div>
                <div className="text-5xl font-bold text-[#0056b3] tracking-tight">50+</div>
                <div className="text-sm font-semibold text-slate-400 mt-2">Successful Projects</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#0056b3] tracking-tight">100%</div>
                <div className="text-sm font-semibold text-slate-400 mt-2">Transparency</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Office" 
              className="rounded-sm shadow-2xl transition-all duration-700"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#0056b3] rounded-sm -z-10"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <div className="text-[#0056b3] text-sm font-bold mb-4">Our Foundation</div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Quality First', desc: 'We never compromise on the quality of our infrastructure and documentation.', icon: <ShieldCheck size={40}/> },
              { title: 'Customer Centric', desc: 'Our customers are at the heart of everything we do. Their satisfaction is our success.', icon: <Heart size={40}/> },
              { title: 'Innovation', desc: 'We embrace modern technology to make land buying a seamless experience.', icon: <Target size={40}/> },
            ].map((v, i) => (
              <div key={i} className="bg-white p-12 rounded-sm shadow-xl border border-slate-100 space-y-6 hover:-translate-y-2 transition-all">
                <div className="text-[#0056b3]">{v.icon}</div>
                <h3 className="text-2xl font-bold">{v.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
