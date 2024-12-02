import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'

export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
      providerImportSource: "@mdx-js/react"
    })
  ],

  optimizeDeps: {
    include: [
      '@mdx-js/react',
      'react-syntax-highlighter',
      'react-syntax-highlighter/dist/cjs/styles/prism',
      'react-syntax-highlighter/dist/cjs/languages/prism/javascript',
      'react-syntax-highlighter/dist/cjs/languages/prism/typescript',
      'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
    ]
  }
})