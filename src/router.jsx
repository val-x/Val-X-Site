import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Blog from './pages/Blog';
import BlogPost from './components/BlogPost';
import Solutions from './pages/Solutions';
import Careers from './pages/Careers';
import GetStarted from './pages/GetStarted';
import CaseStudies from './pages/CaseStudies';
import BlogError from './components/BlogError';
import LearnWithUs from './pages/LearnWithUs';
import ProgramMaterials from './pages/ProgramMaterials';
import Support from './pages/Support';
import Docs from './pages/Docs';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ModelViewPage from './pages/ModelViewPage';
import NewBlog from './pages/NewBlog';
import Culture from './pages/Culture';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/new",
    element: <NewBlog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    errorElement: <BlogError />
  },
  {
    path: "/solutions",
    element: <Solutions />,
  },
  {
    path: "/get-started",
    element: <GetStarted />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/case-studies",
    element: <CaseStudies />,
  },
  {
    path: "/learn-with-us",
    element: <LearnWithUs />,
  },
  {
    path: "/program/:programId/materials",
    element: <ProgramMaterials />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <TermsOfService />,
  },
  {
    path: "/cookies",
    element: <CookiePolicy />,
  },
  {
    path: "/projects",
    element: <ModelViewPage />,
  },
  {
    path: "/culture",
    element: <Culture />,
  },
]); 
