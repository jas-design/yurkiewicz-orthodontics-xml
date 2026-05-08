import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openCalendly, resolveImageUrl } from '../../utils/config';
import { useConfig } from '../../context/ConfigContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { config, loading } = useConfig();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading || !config) return null;

  const { branding, contactInfo, navigation } = config;

  const navLinks = navigation && navigation.length > 0 ? navigation : [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const Logo = ({ isMobile = false }) => {
    const useImage = branding.logo.useImageLogo === 'true';

    return (
      <Link to="/" className="flex items-center gap-3" onClick={isMobile ? () => setIsOpen(false) : undefined}>
        {useImage ? (
          <img 
            src={resolveImageUrl(branding.logo.imageUrl || 'images/logo.png')} 
            alt="Logo" 
            className={`${isMobile ? 'h-8' : 'h-10 lg:h-[60px]'} w-auto object-contain`} 
          />
        ) : (
          <>
            <div className={`${isMobile ? 'w-8 h-8 text-base' : 'w-10 h-10 lg:w-[60px] lg:h-[60px] text-2xl lg:text-3xl'} bg-primary rounded-xl flex items-center justify-center text-white font-display font-black shadow-lg shadow-primary/20 transition-transform hover:scale-110`}>
              {branding.logo.textMain.charAt(0)}
            </div>
            <div className="flex flex-col -gap-1">
              <span className={`${isMobile ? 'text-lg' : 'text-xl lg:text-3xl'} font-display font-black text-dark-navy leading-none tracking-tight`}>
                {branding.logo.textMain}
              </span>
              <span className={`${isMobile ? 'text-[8px]' : 'text-[10px] lg:text-xs'} font-display font-bold text-primary tracking-[0.3em] uppercase leading-none`}>
                {branding.logo.textSub}
              </span>
            </div>
          </>
        )}
      </Link>
    );
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${(isScrolled || location.pathname !== '/') ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link text-sm font-bold tracking-tight first-letter:uppercase ${location.pathname === link.path ? 'text-primary' : 'text-dark-navy'}`}
            >
              {link.name}
            </Link>
          ))}

          <button 
            onClick={openCalendly}
            className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm tracking-tight hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
          >
            Book Appointment <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><Calendar size={14} /></div>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-dark-navy" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white z-[70] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <Logo isMobile={true} />
                <button onClick={() => setIsOpen(false)} className="text-dark-navy">
                  <X size={32} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-xl font-display font-medium text-dark-navy hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button 
                  onClick={() => { setIsOpen(false); openCalendly(); }}
                  className="px-6 py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book Appointment <Calendar size={18} />
                </button>
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="text-slate-500 mb-2">Need Help?</p>
                  <a href={`tel:${contactInfo.phoneMain}`} className="text-xl font-bold text-primary flex items-center gap-2">
                    <Phone size={20} /> {contactInfo.phoneMain}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
