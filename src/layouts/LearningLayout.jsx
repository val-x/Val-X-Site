import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const LearningLayout = () => {
  return (
    <div className="bg-slate-950 text-white">
      <SEO 
        title="Val-X Learning - AI-Powered Learning Platform"
        description="Transform your learning experience with Val-X's AI-powered platform. Access personalized courses and interactive lessons for skill development."
        keywords="AI learning platform, online courses, skill development, interactive learning, Val-X Learning"
        type="website"
      />
      <Navbar variant="learning" />
      <Outlet />
      <Footer variant="learning" />
    </div>
  );
};

export default LearningLayout; 