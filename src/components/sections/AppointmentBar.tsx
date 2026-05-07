import React from 'react';
import { Calendar, User, Phone, Mail, ArrowRight } from 'lucide-react';
import { openCalendly } from '../../utils/config';

const AppointmentBar = () => {
  return (
    <section className="py-12 bg-white relative z-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 lg:p-12 border border-slate-100">
          <div className="grid lg:grid-cols-5 gap-6 items-end">
            <div className="lg:col-span-1">
              <label className="block text-xs font-black text-dark-navy mb-3 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input type="text" placeholder="Your Name" className="w-full pl-12 pr-4 py-4 bg-light-bg border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <label className="block text-xs font-black text-dark-navy mb-3 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input type="email" placeholder="Your Email" className="w-full pl-12 pr-4 py-4 bg-light-bg border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
              </div>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-xs font-black text-dark-navy mb-3 uppercase tracking-widest">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input type="tel" placeholder="Your Phone" className="w-full pl-12 pr-4 py-4 bg-light-bg border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
              </div>
            </div>

            <div className="lg:col-span-1">
              <label className="block text-xs font-black text-dark-navy mb-3 uppercase tracking-widest">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input type="date" className="w-full pl-12 pr-4 py-4 bg-light-bg border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
              </div>
            </div>

            <div className="lg:col-span-1">
              <button 
                onClick={openCalendly}
                className="btn-primary w-full py-4 rounded-xl shadow-lg shadow-primary/20 cursor-pointer"
              >
                Book Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default AppointmentBar;
