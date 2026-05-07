import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { useConfig } from '../context/ConfigContext';
import { resolveImageUrl } from '../utils/config';
import Lightbox from '../components/ui/Lightbox';

const GalleryPage = () => {
  const { config, loading } = useConfig();
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0
  });

  if (loading || !config) return null;

  const page = config.pages.gallery;
  const images = page.items || [];
  const transformations = page.transformations || [];

  const openLightbox = (imageSet: any[], index: number, isTransformation = false) => {
    let resolvedImages: string[] = [];
    
    if (isTransformation) {
      // For transformations, we show the clicked image. 
      // Optionally we could show before/after pairs as a set.
      // Let's create a set of all transformation images.
      resolvedImages = transformations.flatMap((item: any) => [
        resolveImageUrl(item.before),
        resolveImageUrl(item.after)
      ]);
      // The index needs adjustment because flatMap doubled the entries
      setLightbox({
        isOpen: true,
        images: resolvedImages,
        index: index
      });
    } else {
      resolvedImages = images.map((img: any) => resolveImageUrl(img.value));
      setLightbox({
        isOpen: true,
        images: resolvedImages,
        index: index
      });
    }
  };

  return (
    <main>
      <PageHeader title={page.headerTitle} />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((img: any, idx: number) => (
              <div 
                key={idx} 
                className="relative group overflow-hidden rounded-[2.5rem] aspect-[4/3] shadow-lg border-4 border-light-bg cursor-pointer"
                onClick={() => openLightbox(images, idx)}
              >
                <img 
                  src={resolveImageUrl(img.value)} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-6 backdrop-blur-[2px]">
                  <h3 className="text-white text-xl font-black font-display uppercase tracking-widest">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h2 className="section-title mb-12">{page.transformationsTitle.split('Transformations')[0]} <span className="text-primary font-black">Transformations</span></h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {transformations.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-6 bg-light-bg p-8 rounded-[3rem] border border-slate-50 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="rounded-[2rem] overflow-hidden relative shadow-md cursor-pointer group"
                      onClick={() => openLightbox(transformations, idx * 2, true)}
                    >
                      <img src={resolveImageUrl(item.before)} alt="Before" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-dark-navy text-white text-[8px] font-black px-3 py-1 rounded-lg tracking-widest uppercase shadow-lg">BEFORE</div>
                    </div>
                    <div 
                      className="rounded-[2rem] overflow-hidden relative shadow-md cursor-pointer group"
                      onClick={() => openLightbox(transformations, idx * 2 + 1, true)}
                    >
                      <img src={resolveImageUrl(item.after)} alt="After" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-primary text-white text-[8px] font-black px-3 py-1 rounded-lg tracking-widest uppercase shadow-lg">AFTER</div>
                    </div>
                  </div>
                  <h4 className="font-black text-dark-navy uppercase tracking-widest text-sm">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Lightbox 
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.index}
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        onNavigate={(index) => setLightbox(prev => ({ ...prev, index }))}
      />
    </main>
  );
};

export default GalleryPage;

