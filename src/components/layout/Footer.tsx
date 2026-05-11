import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { resolveImageUrl } from '../../utils/config';
import { useConfig } from '../../context/ConfigContext';

const Footer = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const { branding, contactInfo, sections, navigation } = config;
  const logoHeight = parseInt(branding.logo.imageHeight || '90');
  const useImage = branding.logo.useImageLogo === 'true';
  const desktopLogoHeight = useImage ? logoHeight : 65;

  const footerLogoStyle = {
    '--footer-logo-desktop': `${desktopLogoHeight}px`,
    '--footer-logo-mobile': '70px'
  } as React.CSSProperties;

  return (
    <footer className="bg-dark-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-8 text-white">
              {branding.logo.useImageLogo === 'true' ? (
                <img 
                  src={resolveImageUrl(branding.logo.imageUrl || 'images/logo.png')} 
                  alt="Logo" 
                  style={footerLogoStyle}
                  className="h-[var(--footer-logo-mobile)] lg:h-[var(--footer-logo-desktop)] w-auto object-contain brightness-0 invert" 
                />
              ) : (
                <>
                  <div 
                    style={footerLogoStyle}
                    className="h-[var(--footer-logo-mobile)] w-[var(--footer-logo-mobile)] lg:h-[var(--footer-logo-desktop)] lg:w-[var(--footer-logo-desktop)] bg-primary rounded-xl flex items-center justify-center text-white font-display font-black text-2xl lg:text-4xl shadow-lg shadow-primary/20 transition-transform hover:scale-110"
                  >
                    {branding.logo.textMain.charAt(0)}
                  </div>
                  <div className="flex flex-col -gap-1">
                    <span className="text-xl lg:text-3xl font-display font-black text-white leading-none tracking-tight">
                      {branding.logo.textMain}
                    </span>
                    <span className="text-[10px] lg:text-xs font-display font-bold text-primary tracking-[0.3em] uppercase leading-none">
                      {branding.logo.textSub}
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="text-white/60 mb-10 max-w-xs leading-relaxed font-medium">
              {sections.footer.description}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, url: contactInfo.socialLinks.facebook },
                { Icon: Instagram, url: contactInfo.socialLinks.instagram },
                { Icon: Youtube, url: contactInfo.socialLinks.youtube },
                { Icon: Twitter, url: contactInfo.socialLinks.twitter },
              ].map(({ Icon, url }, idx) => (
                <a key={idx} href={url} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-lg font-black mb-8 text-white">Services</h4>
            <ul className="space-y-4">
              {(sections.services.items || []).map((item: any, idx: number) => (
                <li key={idx}>
                  <Link to="/services" className="text-white/60 hover:text-primary transition-all font-bold text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-lg font-black mb-8 text-white">Information</h4>
            <ul className="space-y-4">
              {(navigation || []).map((item: any, idx: number) => (
                <li key={idx}>
                  <Link to={item.path} className="text-white/60 hover:text-primary transition-all font-bold text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-lg font-black mb-8 text-white">Quick Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 text-white/60 text-sm">
                <MapPin size={20} className="text-primary shrink-0" />
                <span className="font-bold">{contactInfo.address}</span>
              </li>
              <li className="flex gap-4 text-white/60 text-sm">
                <Phone size={20} className="text-primary shrink-0" />
                <span className="font-bold">{contactInfo.phoneMain}</span>
              </li>
              <li className="flex gap-4 text-white/60 text-sm">
                <Mail size={20} className="text-primary shrink-0" />
                <span className="font-bold">{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{sections.footer.copyright}</p>
          <div className="flex gap-8 text-slate-500 font-bold uppercase text-xs tracking-widest">
            <a href="#" className="hover:text-primary transition-all">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-all">Privacy Policy</a>
            <Link to="/admin" className="hover:text-primary transition-all">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
