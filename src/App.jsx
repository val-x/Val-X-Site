import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Technologies from './components/Technologies';
import Process from './components/Process';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Technologies />
      <Process />
      <Achievements />
      <Testimonials />
      <Team />
      <Pricing />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-gray-900 text-white border border-gray-800',
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </div>
  )
}

export default Sentry.withProfiler(App);
