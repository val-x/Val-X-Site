import { MDXProvider } from '@mdx-js/react';
import { components } from './BlogLayout';

export function MDXWrapper({ children }) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
} 