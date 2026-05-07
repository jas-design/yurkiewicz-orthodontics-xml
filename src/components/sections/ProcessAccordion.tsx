import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Calendar, Heart, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { openCalendly } from '../../utils/config';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const ProcessAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.processAccordion;
  const items = section.items || [];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={resolveImageUrl(section.image)} 
                alt="Patient treatment"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <div>
            <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
            </h5>
            <h2 className="section-title mb-6 font-black lg:text-6xl leading-[1]">
              {section.title}
            </h2>
            <p className="text-slate-400 mb-10 font-medium">
              {section.description}
            </p>

            <div className="space-y-4">
              {items.map((item: any, idx: number) => {
                const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.CheckCircle;
                return (
                  <div 
                    key={idx}
                    className={`border-b border-slate-200 transition-all ${activeIndex === idx ? 'pb-6' : 'pb-4'}`}
                  >
                    <button
                      onClick={() => {
                        setActiveIndex(activeIndex === idx ? -1 : idx);
                      }}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeIndex === idx ? 'bg-primary text-white' : 'bg-primary/5 text-primary group-hover:bg-primary/10'}`}>
                          <IconComponent size={20} />
                        </div>
                        <span className={`text-xl font-black transition-colors ${activeIndex === idx ? 'text-primary' : 'text-dark-navy group-hover:text-primary'}`}>
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown 
                        size={24} 
                        className={`text-slate-400 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180 text-primary' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 pl-14 text-slate-500 font-medium leading-relaxed">
                            {item.content || item.value}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessAccordion;
