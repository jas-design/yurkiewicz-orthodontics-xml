import React from 'react';
import { useConfig } from '../../context/ConfigContext';

const Stats = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.stats;
  const stats = section.stat || [];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-left border-l border-slate-100 pl-8">
              <h3 className="text-5xl lg:text-6xl font-display font-black text-dark-navy mb-4 tracking-tighter">{stat.value}</h3>
              <h4 className="text-lg font-black text-dark-navy mb-4 leading-tight">{stat.label}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
