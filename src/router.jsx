import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Blog from './pages/Blog';
import Solutions from './pages/Solutions';
import Careers from './pages/Careers';
import GetStarted from './pages/GetStarted';
import CaseStudies from './pages/CaseStudies';
import BlogLayout from './components/BlogLayout';
import BlogError from './components/BlogError';
import LearnWithUs from './pages/LearnWithUs';
import ProgramMaterials from './pages/ProgramMaterials';

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
    path: "/blog/:slug",
    element: <BlogLayout />,
    loader: async ({ params }) => {
      try {
        const post = await import(`./templates/${params.slug}.mdx`);
        return { post: post.default };
      } catch (error) {
        throw new Response("Not Found", { 
          status: 404,
          statusText: "Blog post not found" 
        });
      }
    },
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
    path: "/program-materials/:programId",
    element: <ProgramMaterials />,
  },
]); 
