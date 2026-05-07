import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import ContactSection from '../components/sections/ContactSection';
import InfoBar from '../components/sections/InfoBar';
import { useConfig } from '../context/ConfigContext';

const ContactPage = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const page = config.pages.contact;

  return (
    <main>
      <PageHeader title={page.headerTitle} />
      <div className="mt-12">
        <InfoBar />
      </div>
      <ContactSection />
    </main>
  );
};

export default ContactPage;
