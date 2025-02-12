import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Process from "../components/Process";
import Achievements from "../components/Achievements";
import Testimonials from "../components/Testimonials";
import Team from "../components/Team";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { features, stats, testimonials } from "../data/programs";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Stats stats={stats} /> */}
      {/* <Features /> */}
      <Process />
      <Achievements />
      <Pricing />
      <Testimonials />
      <Team />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
