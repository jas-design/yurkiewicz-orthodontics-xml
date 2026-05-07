import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { openCalendly, resolveImageUrl } from '../../utils/config';
import { useConfig } from '../../context/ConfigContext';

const CTABanner = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.ctaBanner;
  const { contactInfo } = config;

  return (
    <section className="py-20 relative overflow-hidden bg-primary rounded-[3.5rem] mx-4 my-12 shadow-2xl shadow-primary/20">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
      <div className="container mx-auto px-8 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
              {section.title.split(section.highlight)[0]} <br />
              <span className="text-secondary underline decoration-secondary decoration-4 underline-offset-8">{section.highlight}</span>
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-lg leading-relaxed font-medium">
              {section.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={openCalendly}
                className="px-8 py-4 bg-white text-primary rounded-xl font-black uppercase tracking-widest text-sm shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-2 cursor-pointer"
              >
                {section.buttonText} <Calendar size={20} />
              </button>
              <a href={`tel:${contactInfo.phoneMain}`} className="px-8 py-4 bg-dark-navy text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-2">
                {section.phoneLabel} <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white/10 group">
              <img
                src={resolveImageUrl(section.image)}
                alt="Expert Dentist"
                className="w-full max-w-sm mx-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
