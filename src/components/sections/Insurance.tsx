import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Insurance = () => {
  return (
    <section className="py-24 bg-white" id="insurance">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h5 className="text-primary font-bold tracking-widest uppercase mb-4">Insurance & Payment</h5>
            <h2 className="section-title mb-8">
              We Make Quality Dental <span className="text-primary">Care Affordable</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We believe financial constraints shouldn't stand in the way of a healthy smile. We accept most major PPO insurance plans and offer flexible financing options.
            </p>

            <div className="space-y-6 mb-10">
              <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 flex items-start gap-4">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-black text-dark-navy mb-1 uppercase tracking-tight">Most PPO Insurance Accepted</h4>
                  <p className="text-slate-500 text-sm">We handle all the paperwork and help you maximize your benefits.</p>
                </div>
              </div>
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-black text-dark-navy mb-1 uppercase tracking-tight">Flexible Financing Available</h4>
                  <p className="text-slate-500 text-sm">We offer interest-free payment plans through CareCredit and other providers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { title: 'Standard Coverage', price: '$99', items: ['Essential Checkup', 'Digital X-Rays', 'Professional Cleaning'], color: 'slate' },
              { title: 'Advanced Care', price: '$249', items: ['Comprehensive Exam', 'Laser Whitening', 'Full Scaling'], color: 'primary' },
            ].map((plan, idx) => (
              <div key={idx} className={`p-10 rounded-[2.5em] border-4 transition-all group ${idx === 1 ? 'border-primary bg-primary text-white scale-105 shadow-2xl shadow-primary/30' : 'border-slate-50 bg-light-bg hover:border-primary/30'}`}>
                <h4 className={`text-xl font-black mb-4 uppercase tracking-widest ${idx === 1 ? 'text-white' : 'text-dark-navy'}`}>{plan.title}</h4>
                <div className="flex items-baseline gap-1 mb-6">
                   <span className="text-5xl font-black">{plan.price}</span>
                   <span className="text-sm opacity-70">/visit</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle2 size={18} className={idx === 1 ? 'text-white' : 'text-primary'} /> {item}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-md cursor-pointer ${idx === 1 ? 'bg-white text-primary hover:bg-slate-100' : 'bg-primary text-white hover:bg-dark-navy'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insurance;
