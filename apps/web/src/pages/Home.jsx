import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Technologies from '../components/Technologies';
import Process from '../components/Process';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { features, stats, testimonials } from '../data/programs';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats 
        stats={[
          {
            number: "500+",
            label: "Projects Completed",
            icon: "🚀"
          },
          {
            number: "100+",
            label: "Happy Clients",
            icon: "🤝"
          },
          {
            number: "98%",
            label: "Client Retention",
            icon: "♥️"
          },
          {
            number: "24/7",
            label: "Support Available",
            icon: "💬"
          }
        ]}
        badge="Our Impact"
        title="Making a Difference"
        variant="default"
      />
      <Features features={features} />
      <Technologies />
      <Process />
      <Achievements />
      <Testimonials testimonials={testimonials} />
      <Team />
      <Pricing />
      <FAQ />
      <CTA 
        badge="Ready to Get Started?"
        title="Build Something Amazing Together"
        description="Join our community of innovators and creators. Let's turn your vision into reality with cutting-edge technology and expert guidance."
        primaryAction={{
          text: "Our Projects",
          link: "/projects"
        }}
        secondaryAction={{
          text: "Schedule Consultation",
          onClick: () => window.location.href = '/get-started'
        }}
      />
      <Contact />
      <Footer />
    </>
  );
};

export default Home; 