import { createBrowserRouter } from 'react-router-dom';
import Blog from '../pages/Blog';
import BlogPost from '../components/BlogPost';
import { blogPosts } from '../data/blogData';
import App from '../App';

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
    element: <BlogPost />,
    loader: async ({ params }) => {
      const post = blogPosts.find(post => post.slug === params.slug);
      if (!post) {
        throw new Response("Not Found", { status: 404 });
      }
      return post;
    },
    errorElement: (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <a 
            href="/blog" 
            className="text-blue-500 hover:text-blue-400 underline"
          >
            Return to Blog
          </a>
        </div>
      </div>
    ),
  }
]); 