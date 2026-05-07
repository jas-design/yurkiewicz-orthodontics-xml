import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ title, bgImage }: { title: string, bgImage?: string }) => {
  return (
    <div 
      className="relative pt-44 pb-32 bg-dark-navy overflow-hidden"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute inset-0 bg-dark-navy/90 z-0" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tight">{title}</h1>
        <div className="flex items-center justify-center gap-3 text-white/70 font-black uppercase tracking-widest text-xs">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="text-primary" />
          <span className="text-primary">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
