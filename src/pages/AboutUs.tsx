import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import Team from '../components/sections/Team';
import { Shield, Award, MapPin } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const AboutUs = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const page = config.pages.aboutUs;

  const highlights = [
    { icon: Shield, title: page.mission.title, desc: page.mission.description },
    { icon: Award, title: page.certifications.title, desc: page.certifications.description },
    { icon: MapPin, title: page.story.title, desc: page.story.description },
  ];

  return (
    <main>
      <PageHeader title={page.headerTitle} />
      <About />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {highlights.map((item, idx) => (
              <div key={idx} className="p-10 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:shadow-xl transition-all">
                <div className="w-20 h-20 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue mx-auto mb-8">
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold text-dark-blue mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Team />
    </main>
  );
};

export default AboutUs;
