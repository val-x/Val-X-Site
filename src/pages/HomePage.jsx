import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
// ... other imports

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Val-X - Innovative Software Development for Startups"
        description="Val-X is a leading software development company specializing in building innovative solutions for startups."
      />
      <Navbar variant="company" />
      <Hero />
      {/* ... rest of your home page content ... */}
    </>
  );
};

export default HomePage; 