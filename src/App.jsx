import { Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import { useParams } from 'react-router-dom';

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
  SupportUs,
  NotFound
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
import DocumentPreview from './pages/DocumentPreview';
import EditDocument from './pages/EditDocument';
import { DocumentProvider } from './contexts/DocumentContext';
import VideoBlogPost from './pages/VideoBlogPost';
import PodcastBlogPost from './pages/PodcastBlogPost';
import { blogPosts } from './data/blogData';

const VideoBlogWrapper = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (post?.type === 'video') {
    return <VideoBlogPost />;
  } else if (post?.type === 'podcast' || post?.type === 'audio') {
    return <PodcastBlogPost />;
  } else {
    return <BlogPost />;
  }
};

const App = () => {
  return (
    <HelmetProvider>
      <DocumentProvider>
        <Helmet>
          <meta 
            http-equiv="Content-Security-Policy" 
            content={`
              default-src 'self' https: data: blob:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live https://*.val-x.in;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com;
              font-src 'self' https://fonts.gstatic.com https://*.gstatic.com;
              img-src 'self' data: blob: https: http:;
              media-src 'self' https: data: blob:;
              connect-src 'self' https: wss: blob:;
              worker-src 'self' blob:;
              frame-src 'self' https:;
            `}
          />
        </Helmet>
        <div className="bg-black text-white">
          <SEO />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/new" element={<NewBlog />} />
            <Route 
              path="/blog/:slug" 
              element={<VideoBlogWrapper />}
              errorElement={<BlogError />}
            />
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
            <Route path="/admin/content/preview/:id" element={<DocumentPreview />} />
            <Route path="/admin/content/edit/:id" element={<EditDocument />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </DocumentProvider>
    </HelmetProvider>
  );
};

export default Sentry.withProfiler(App);
