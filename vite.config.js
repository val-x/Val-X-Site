import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
      providerImportSource: "@mdx-js/react"
    })
  ],

  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'mdx': ['@mdx-js/rollup', 'remark-gfm', 'rehype-prism-plus']
        }
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@mdx-js/react']
  }
})