import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.faq;
  const faqs = section.items || [];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h5 className="text-primary font-bold tracking-widest uppercase mb-4">{section.tagline}</h5>
            <h2 className="section-title mb-8">
              {section.title.split('Questions')[0]} <span className="text-primary">Questions</span>
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-light-bg rounded-2xl border border-slate-50 overflow-hidden shadow-sm transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                    className="w-full p-6 flex justify-between items-center text-left cursor-pointer"
                  >
                    <span className="text-lg font-black text-dark-navy tracking-tight leading-tight">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/20' : 'bg-white text-primary border border-primary/20'}`}>
                      {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium pt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src={resolveImageUrl(section.image)}
              alt="Dentist Consultation"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
