import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.beforeAfter;

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <section className="py-24 bg-dark-navy overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Comparison Slider */}
          <div 
            ref={containerRef}
            className="relative aspect-[4/3] rounded-[3rem] overflow-hidden cursor-ew-resize select-none border-8 border-white/10 shadow-2xl"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
          >
            {/* After Image (Base) */}
            <img 
              src={resolveImageUrl(section.imageAfter)} 
              alt="After Whitening"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Before Image (Overlay with Clip Path) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden border-r border-white/50 z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={resolveImageUrl(section.imageBefore)} 
                alt="Before Whitening"
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] sepia-[0.3] brightness-[0.9]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-30"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(51,153,166,0.3)] flex items-center justify-center border-2 border-white">
                <div className="flex -gap-1 text-primary">
                  <ChevronLeft size={18} strokeWidth={3} />
                  <ChevronRight size={18} strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-8 left-8 px-5 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] z-20 border border-white/10">
              Before
            </div>
            <div className="absolute bottom-8 right-8 px-5 py-2 bg-primary/90 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] z-20 border border-white/20 shadow-lg">
              After
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
            </h5>
            <h2 className="text-4xl lg:text-6xl font-display font-black text-white mb-8 leading-tight">
              {section.title}
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed font-medium text-lg">
              {section.descriptionMain}
            </p>
            <p className="text-white/60 mb-10 leading-relaxed font-medium">
              {section.descriptionSub}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h4 className="text-xl font-display font-black text-white">{section.doctorName}</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
