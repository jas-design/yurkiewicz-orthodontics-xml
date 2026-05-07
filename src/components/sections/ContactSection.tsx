import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Plus, Minus } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';

const ContactSection = () => {
  const { config, loading } = useConfig();
  const [zoom, setZoom] = useState(15);

  if (loading || !config) return null;

  const { contactInfo } = config;

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-24 bg-light-bg" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Map Column */}
          <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] lg:h-auto min-h-[500px] relative border-8 border-white group">
            <iframe
              src={mapUrl}
              className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Custom Zoom Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
              <button 
                onClick={() => setZoom(prev => Math.min(prev + 1, 21))}
                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-dark-navy hover:bg-primary hover:text-white transition-all cursor-pointer"
                title="Zoom In"
              >
                <Plus size={20} />
              </button>
              <button 
                onClick={() => setZoom(prev => Math.max(prev - 1, 1))}
                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-dark-navy hover:bg-primary hover:text-white transition-all cursor-pointer"
                title="Zoom Out"
              >
                <Minus size={20} />
              </button>
            </div>
          </div>

          {/* Info & Form Column */}
          <div className="p-2">
            <h5 className="text-primary font-bold tracking-widest uppercase mb-4">Contact Now</h5>
            <h2 className="section-title mb-8">
              Get Free <span className="text-primary">Professional Consultation</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-dark-navy uppercase tracking-widest mb-1">Clinic Address</h4>
                  <p className="text-slate-500 text-sm font-medium">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-dark-navy uppercase tracking-widest mb-1">Make A Call</h4>
                  <p className="text-slate-500 text-sm font-medium">{contactInfo.phoneMain}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-dark-navy uppercase tracking-widest mb-1">Email Address</h4>
                  <p className="text-slate-500 text-sm font-medium">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-dark-navy uppercase tracking-widest mb-1">Working Hours</h4>
                  <p className="text-slate-500 text-sm font-medium">{contactInfo.workingHours}</p>
                </div>
              </div>
            </div>

            <form className="space-y-4 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="p-4 bg-light-bg border border-slate-50 rounded-xl w-full focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" />
                <input type="email" placeholder="Your Email" className="p-4 bg-light-bg border border-slate-50 rounded-xl w-full focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" />
              </div>
              <input type="text" placeholder="Subject" className="p-4 bg-light-bg border border-slate-50 rounded-xl w-full focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" />
              <textarea placeholder="Your Message" rows={4} className="p-4 bg-light-bg border border-slate-50 rounded-xl w-full focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" />
              <button className="btn-primary w-full py-4 text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 cursor-pointer">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
