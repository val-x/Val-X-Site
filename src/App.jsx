import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Features from './components/Features';
import Projects from './components/Projects';
import Technologies from './components/Technologies';
import Process from './components/Process';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Blog from './components/Blog';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Features />
      <Projects />
      <Technologies />
      <Process />
      <Achievements />
      <Testimonials />
      <Team />
      <Blog />
      <Pricing />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </div>
  )
}

export default Sentry.withProfiler(App);
