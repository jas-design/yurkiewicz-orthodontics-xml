import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import Services from '../components/sections/Services';
import CTABanner from '../components/sections/CTABanner';
import FAQ from '../components/sections/FAQ';
import { useConfig } from '../context/ConfigContext';

const ServicesPage = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const page = config.pages.services;

  return (
    <main>
      <PageHeader title={page.headerTitle} />
      <Services />
      <FAQ />
      <CTABanner />
    </main>
  );
};

export default ServicesPage;
