import { SEO } from '../components';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 - Page Not Found | VAL-X"
        description="The page you're looking for cannot be found."
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2">Page not found</p>
        </div>
      </div>
    </>
  );
};

export default NotFound; 