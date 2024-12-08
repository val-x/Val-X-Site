import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import * as Sentry from '@sentry/react';

// Pages
import {
  Home,
  LearnWithUs,
  ProgramMaterials,
  Blog,
  Solutions,
  Careers,
  GetStarted,
  Support,
  Docs,
  About,
  Contact,
  PrivacyPolicy,
  TermsOfService,
  CookiePolicy,
  NewBlog,
  Culture,
  Showcase,
  SupportUs
} from '@pages';

// Components
import { BlogPost, BlogError } from '@components';
import { SEO } from '@components/common';
import Copyright from './pages/Copyright';
import Admin from './pages/Admin';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NewProject from './pages/NewProject';
import ScheduleSession from './pages/ScheduleSession';

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
          <Route path="/program-materials/:programId" element={<ProgramMaterials />} />
          <Route path="/support" element={<Support />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/support-us" element={<SupportUs />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/schedule-session" element={<ScheduleSession />} />
        </Routes>
        <Toaster />
      </div>
    </HelmetProvider>
  );
};

export default Sentry.withProfiler(App);
