import React from 'react';
import { motion } from 'motion/react';
import { TEAM } from '../../constants';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const Team = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.team;
  const members = section.members || TEAM;

  return (
    <section className="py-24 bg-light-bg" id="team">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
          </h5>
          <h2 className="section-title font-black lg:text-6xl">
            {section.title}
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed font-bold">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] border border-slate-50 overflow-hidden group shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-[4/5] m-4 rounded-[2rem]">
                <img
                  src={resolveImageUrl(member.image)}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-6 pb-8 text-center">
                <h4 className="text-xl font-black text-dark-navy mb-1">{member.name}</h4>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{member.role || member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
