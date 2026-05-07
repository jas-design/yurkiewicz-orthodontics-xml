import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const VideoPromo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.videoPromo;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group">
          <img 
            src={resolveImageUrl(section.thumbnail)} 
            alt="Clinic Video" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-dark-navy/40 backdrop-blur-[2px] flex items-center justify-center text-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h5 className="text-white font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
              </h5>
              <h2 className="text-4xl lg:text-6xl font-display font-black text-white mb-8 leading-tight">
                {section.title}
              </h2>
              <button 
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 bg-white text-dark-navy rounded-full font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all flex items-center gap-3 shadow-2xl shadow-black/20 mx-auto cursor-pointer group"
              >
                {section.buttonText} <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-all"><Play size={16} fill="currentColor" /></div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-navy/95 backdrop-blur-xl p-4 lg:p-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(51,153,166,0.3)]"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-dark-navy rounded-full flex items-center justify-center transition-all z-10"
              >
                <X size={24} />
              </button>
              
              <iframe 
                width="100%" 
                height="100%" 
                src={section.videoUrl} 
                title="Dental Clinic Tour" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoPromo;
