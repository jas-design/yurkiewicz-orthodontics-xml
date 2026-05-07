import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../../constants';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';

const Services = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.services;
  const services = section.items || SERVICES;

  return (
    <section className="py-24 bg-light-bg" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
          </h5>
          <h2 className="section-title mb-4 font-black lg:text-6xl">
            {section.title}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed font-bold">
            We are committed to sustainability, eco-friendly initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service: any, index: number) => {
            const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Stethoscope;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 bg-white border border-slate-50 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group relative border-b-4 border-b-transparent hover:border-b-primary"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-display font-black text-dark-navy mb-4 group-hover:text-primary transition-colors leading-tight">{service.title}</h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed font-medium">{service.description}</p>
                
                <button className="flex items-center gap-2 text-dark-navy font-black text-xs uppercase tracking-widest cursor-pointer group/btn">
                  Read More <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all"><ArrowRight size={14} /></div>
                </button>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-12 mb-16">
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed font-bold mb-8">
            We believe in using the latest technology and techniques to ensure the best outcomes for our patients.
          </p>
          <button className="px-10 py-5 bg-primary text-white rounded-full font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all flex items-center gap-3 shadow-2xl shadow-primary/30 mx-auto group">
            View All Service <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all"><ArrowRight size={18} /></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
