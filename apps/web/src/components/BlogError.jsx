import { useRouteError, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function BlogError() {
  const error = useRouteError();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {error.status === 404 ? 'Community Post Not Found' : 'Something went wrong'}
          </h1>
          <p className="text-gray-400 mb-8">
            {error.status === 404 
              ? "The community post you're looking for doesn't exist."
              : "We're having trouble loading this community post."}
          </p>
          <Link 
            to="/blog" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Community
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BlogError; 