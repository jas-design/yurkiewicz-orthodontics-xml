import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../../constants';
import * as LucideIcons from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';

const Diagnosis = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.diagnosis;
  const features = section.features || WHY_CHOOSE_US;
  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3, 6);

  return (
    <section className="py-24 bg-light-bg overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 text-primary/10 rotate-12">
        <LucideIcons.Plus size={80} strokeWidth={1} />
      </div>
      <div className="absolute bottom-20 right-10 text-primary/10 -rotate-12">
        <LucideIcons.Plus size={60} strokeWidth={1} />
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-primary/5 translate-x-[-20%]">
        <LucideIcons.Star size={120} fill="currentColor" stroke="none" />
      </div>
      <div className="absolute bottom-0 right-0 p-8 text-primary/10">
        <LucideIcons.Sparkle size={100} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-[12px] flex items-center justify-center gap-2">
            + {section.tagline}
          </h5>
          <h2 className="text-4xl lg:text-5xl font-black text-dark-navy mb-6 tracking-tight">
            {section.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed font-semibold text-sm">
            {section.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-16">
            {leftFeatures.map((feature: any, idx: number) => {
              const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.CheckCircle2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-6 justify-end text-right"
                >
                  <div>
                    <h4 className="text-lg font-black text-dark-navy mb-2">{feature.title}</h4>
                    <p className="text-slate-400 text-[13px] font-bold leading-relaxed max-w-[280px] ml-auto">{feature.description}</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-primary shrink-0 border border-slate-100 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column - Tooth Image */}
          <div className="relative flex items-center justify-center py-12">
             {/* Decorative Ring with Dots */}
             <div className="absolute w-[360px] h-[360px] border border-primary/20 rounded-full flex items-center justify-center">
                {/* Dots around the circle */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      transform: `rotate(${i * 60}deg) translateY(-180px)`
                    }}
                  />
                ))}
                {/* Inner white glow */}
                <div className="w-[300px] h-[300px] bg-white rounded-full shadow-[0_0_100px_-20px_rgba(var(--primary-rgb),0.3)] opacity-60" />
             </div>
             
             <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 w-full flex justify-center"
             >
               <img 
                 src={section.toothImage} 
                 alt="3D Tooth"
                 className="w-64 h-64 lg:w-72 lg:h-72 object-contain filter mix-blend-multiply drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
               />
             </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {rightFeatures.map((feature: any, idx: number) => {
              const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.CheckCircle2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-6 text-left"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-primary shrink-0 border border-slate-100 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-dark-navy mb-2">{feature.title}</h4>
                    <p className="text-slate-400 text-[13px] font-bold leading-relaxed max-w-[280px]">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diagnosis;
