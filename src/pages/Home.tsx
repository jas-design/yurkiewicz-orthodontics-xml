import React from 'react';
import Hero from '../components/sections/Hero';
import InfoBar from '../components/sections/InfoBar';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import VideoPromo from '../components/sections/VideoPromo';
import Diagnosis from '../components/sections/Diagnosis';
import Stats from '../components/sections/Stats';
import BeforeAfter from '../components/sections/BeforeAfter';
import ProcessAccordion from '../components/sections/ProcessAccordion';
import Team from '../components/sections/Team';
import Testimonials from '../components/sections/Testimonials';
import Blog from '../components/sections/Blog';

const Home = () => {
  return (
    <main>
      <Hero />
      <InfoBar />
      <About />
      <Services />
      <VideoPromo />
      <Diagnosis />
      <Stats />
      <BeforeAfter />
      <ProcessAccordion />
      <Team />
      <Testimonials />
      <Blog />
    </main>
  );
};

export default Home;
