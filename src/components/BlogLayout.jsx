import { useLoaderData } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import Navbar from './Navbar';
import Footer from './Footer';

const components = {
  // Headings
  h1: props => <h1 className="text-4xl font-bold text-white mb-6" {...props} />,
  h2: props => <h2 className="text-3xl font-bold text-white mb-4" {...props} />,
  h3: props => <h3 className="text-2xl font-bold text-white mb-3" {...props} />,
  h4: props => <h4 className="text-xl font-bold text-white mb-2" {...props} />,
  
  // Text elements
  p: props => <p className="text-gray-300 mb-6 leading-relaxed" {...props} />,
  strong: props => <strong className="font-semibold text-white" {...props} />,
  em: props => <em className="italic text-gray-300" {...props} />,
  
  // Lists
  ul: props => <ul className="list-disc list-inside mb-6 text-gray-300" {...props} />,
  ol: props => <ol className="list-decimal list-inside mb-6 text-gray-300" {...props} />,
  li: props => <li className="mb-2" {...props} />,
  
  // Links and blockquotes
  a: props => <a className="text-blue-400 hover:text-blue-300 underline" {...props} />,
  blockquote: props => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-400" {...props} />
  ),
  
  // Code blocks
  pre: props => <pre className="bg-gray-900 p-4 rounded-lg mb-6 overflow-x-auto" {...props} />,
  code: props => <code className="font-mono text-sm bg-gray-800 px-1 py-0.5 rounded" {...props} />,
  
  // Tables
  table: props => <table className="w-full mb-6 text-gray-300" {...props} />,
  th: props => <th className="border border-gray-700 px-4 py-2 bg-gray-800" {...props} />,
  td: props => <td className="border border-gray-700 px-4 py-2" {...props} />,
};

function BlogLayout() {
  const { post: Post } = useLoaderData();
  
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        <article className="max-w-4xl mx-auto px-6 py-20 prose prose-invert">
          <MDXProvider components={components}>
            <Post />
          </MDXProvider>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default BlogLayout; 