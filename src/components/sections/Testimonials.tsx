import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.testimonials;
  const testimonials = section.items || TESTIMONIALS;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/5]">
              <img 
                src={resolveImageUrl(section.imageMain)} 
                alt="Clinic service"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Rating Card Overlay */}
            <div className="absolute -bottom-10 -right-10 bg-dark-navy p-8 rounded-[2rem] shadow-2xl border-4 border-white text-white max-w-[280px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl font-black">{section.rating}</span>
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-bold">
                {section.ratingDesc}
              </p>
            </div>
          </motion.div>

          <div>
            <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
            </h5>
            <h2 className="section-title mb-6 font-black lg:text-6xl leading-[1]">
              {section.title}
            </h2>
            
            <div className="relative pt-12">
              <Quote className="absolute top-0 left-0 text-primary opacity-20" size={60} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl lg:text-2xl text-slate-500 font-bold leading-relaxed mb-10 pl-4 border-l-4 border-primary">
                    "{current.content || current.text || current.value}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={resolveImageUrl(current.avatar || current.image)} alt={current.name} className="w-16 h-16 rounded-full object-cover shadow-lg" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-xl font-black text-dark-navy tracking-tight">{current.name}</h4>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{current.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={prevTestimonial}
                        className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-dark-navy hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={nextTestimonial}
                        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white hover:bg-dark-navy transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
