import { useLoaderData } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import { useState, useEffect } from 'react';

const BlogPost = () => {
  const post = useLoaderData();
  const [Content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    console.log('Loading MDX file:', post.slug);
    
    import(`../content/blog/${post.slug}.mdx`)
      .then((module) => {
        console.log('MDX module loaded:', module);
        setContent(() => module.default);
      })
      .catch((error) => {
        console.error('Failed to load blog post:', error);
        setError(`Failed to load blog post content: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post.slug]);

  console.log('Render state:', { isLoading, error, hasContent: !!Content });

  return (
    <BlogLayout
      meta={{
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        author: post.author,
        readTime: post.readTime
      }}
    >
      <div className="prose prose-invert prose-lg max-w-none">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-400 py-8">
            <h2 className="text-xl font-semibold mb-2">Error Loading Content</h2>
            <p>{error}</p>
          </div>
        ) : Content ? (
          <Content />
        ) : (
          <div className="text-white">
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <p className="text-red-400">No content loaded</p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default BlogPost; 