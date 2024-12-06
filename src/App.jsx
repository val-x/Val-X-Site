import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import LearnWithUs from './pages/LearnWithUs';
import ProgramMaterials from './pages/ProgramMaterials';
import Blog from './pages/Blog';
import BlogPost from './components/BlogPost';
import Solutions from './pages/Solutions';
import Careers from './pages/Careers';
import GetStarted from './pages/GetStarted';
import BlogError from './components/BlogError';
import Support from './pages/Support';
import Docs from './pages/Docs';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import NewBlog from './pages/NewBlog';
import Culture from './pages/Culture';
import Showcase from './pages/Showcase';
import SupportUs from './pages/SupportUs';
import { Toaster } from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import SEO from './components/SEO';

const App = () => {
  return (
    <HelmetProvider>
      <div className="bg-black text-white">
        <SEO />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/new" element={<NewBlog />} />
          <Route path="/blog/:slug" element={<BlogPost />} errorElement={<BlogError />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/learn-with-us" element={<LearnWithUs />} />
          <Route path="/program/:programId/materials" element={<ProgramMaterials />} />
          <Route path="/support" element={<Support />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/support-us" element={<SupportUs />} />
        </Routes>
        <Toaster />
      </div>
    </HelmetProvider>
  );
};

export default Sentry.withProfiler(App);
