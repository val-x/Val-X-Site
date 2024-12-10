import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const RootLayout = () => {
  return (
    <div className="bg-black text-white">
      <SEO 
        title="Val-X - Software Development & Startup Solutions"
        description="Val-X is a leading software development company specializing in building innovative solutions for startups. We transform ideas into scalable products."
        keywords="software development, startup solutions, web development, mobile apps, tech consulting, Val-X"
        type="website"
      />
      <Navbar variant="company" />
      <Outlet />
      <Footer variant="company" />
    </div>
  );
};

export default RootLayout; 