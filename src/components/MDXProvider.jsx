import { MDXProvider } from '@mdx-js/react';

const components = {
  h1: props => <h1 {...props} className="text-4xl font-bold mb-6" />,
  h2: props => <h2 {...props} className="text-3xl font-bold mb-4" />,
  h3: props => <h3 {...props} className="text-2xl font-bold mb-3" />,
  p: props => <p {...props} className="mb-4" />,
  ul: props => <ul {...props} className="list-disc ml-6 mb-4" />,
  ol: props => <ol {...props} className="list-decimal ml-6 mb-4" />,
  li: props => <li {...props} className="mb-2" />,
};

export function MDXWrapper({ children }) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
} 