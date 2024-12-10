// vite.config.js
import { defineConfig } from "file:///Users/Shared/AppTempletTest/Val-X-Site/node_modules/vite/dist/node/index.js";
import react from "file:///Users/Shared/AppTempletTest/Val-X-Site/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mdx from "file:///Users/Shared/AppTempletTest/Val-X-Site/node_modules/@mdx-js/rollup/index.js";
import remarkGfm from "file:///Users/Shared/AppTempletTest/Val-X-Site/node_modules/remark-gfm/index.js";
import rehypePrismPlus from "file:///Users/Shared/AppTempletTest/Val-X-Site/node_modules/rehype-prism-plus/dist/index.es.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/Shared/AppTempletTest/Val-X-Site/apps/web";
var vite_config_default = defineConfig({
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
      "@mdx-js/react",
      "react-syntax-highlighter",
      "react-syntax-highlighter/dist/cjs/styles/prism",
      "react-syntax-highlighter/dist/cjs/languages/prism/javascript",
      "react-syntax-highlighter/dist/cjs/languages/prism/typescript",
      "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
    ]
  },
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mermaid: ["mermaid"],
          katex: ["katex"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          charts: ["chart.js", "react-chartjs-2"],
          motion: ["framer-motion", "@react-spring/web"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@contexts": path.resolve(__vite_injected_original_dirname, "./src/contexts"),
      "@data": path.resolve(__vite_injected_original_dirname, "./src/data"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvU2hhcmVkL0FwcFRlbXBsZXRUZXN0L1ZhbC1YLVNpdGUvYXBwcy93ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9TaGFyZWQvQXBwVGVtcGxldFRlc3QvVmFsLVgtU2l0ZS9hcHBzL3dlYi92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvU2hhcmVkL0FwcFRlbXBsZXRUZXN0L1ZhbC1YLVNpdGUvYXBwcy93ZWIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IG1keCBmcm9tICdAbWR4LWpzL3JvbGx1cCdcbmltcG9ydCByZW1hcmtHZm0gZnJvbSAncmVtYXJrLWdmbSdcbmltcG9ydCByZWh5cGVQcmlzbVBsdXMgZnJvbSAncmVoeXBlLXByaXNtLXBsdXMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBtZHgoe1xuICAgICAgcmVtYXJrUGx1Z2luczogW3JlbWFya0dmbV0sXG4gICAgICByZWh5cGVQbHVnaW5zOiBbW3JlaHlwZVByaXNtUGx1cywgeyBpZ25vcmVNaXNzaW5nOiB0cnVlIH1dXSxcbiAgICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiBcIkBtZHgtanMvcmVhY3RcIlxuICAgIH0pXG4gIF0sXG5cbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgJ0BtZHgtanMvcmVhY3QnLFxuICAgICAgJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlcicsXG4gICAgICAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyL2Rpc3QvY2pzL3N0eWxlcy9wcmlzbScsXG4gICAgICAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyL2Rpc3QvY2pzL2xhbmd1YWdlcy9wcmlzbS9qYXZhc2NyaXB0JyxcbiAgICAgICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXIvZGlzdC9janMvbGFuZ3VhZ2VzL3ByaXNtL3R5cGVzY3JpcHQnLFxuICAgICAgJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlci9kaXN0L2Nqcy9sYW5ndWFnZXMvcHJpc20vanN4J1xuICAgIF1cbiAgfSxcblxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4uLy4uL2Rpc3QnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgbWVybWFpZDogWydtZXJtYWlkJ10sXG4gICAgICAgICAga2F0ZXg6IFsna2F0ZXgnXSxcbiAgICAgICAgICB0aHJlZTogWyd0aHJlZScsICdAcmVhY3QtdGhyZWUvZmliZXInLCAnQHJlYWN0LXRocmVlL2RyZWknXSxcbiAgICAgICAgICBjaGFydHM6IFsnY2hhcnQuanMnLCAncmVhY3QtY2hhcnRqcy0yJ10sXG4gICAgICAgICAgbW90aW9uOiBbJ2ZyYW1lci1tb3Rpb24nLCAnQHJlYWN0LXNwcmluZy93ZWInXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gIH0sXG5cbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICdAcGFnZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKSxcbiAgICAgICdAaG9va3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcbiAgICAgICdAdXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdXRpbHMnKSxcbiAgICAgICdAY29udGV4dHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29udGV4dHMnKSxcbiAgICAgICdAZGF0YSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9kYXRhJyksXG4gICAgICAnQHN0eWxlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdHlsZXMnKSxcbiAgICAgICdAYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sVUFBVTtBQUxqQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixlQUFlLENBQUMsU0FBUztBQUFBLE1BQ3pCLGVBQWUsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsS0FBSyxDQUFDLENBQUM7QUFBQSxNQUMxRCxzQkFBc0I7QUFBQSxJQUN4QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDN0IsU0FBUyxDQUFDLFNBQVM7QUFBQSxVQUNuQixPQUFPLENBQUMsT0FBTztBQUFBLFVBQ2YsT0FBTyxDQUFDLFNBQVMsc0JBQXNCLG1CQUFtQjtBQUFBLFVBQzFELFFBQVEsQ0FBQyxZQUFZLGlCQUFpQjtBQUFBLFVBQ3RDLFFBQVEsQ0FBQyxpQkFBaUIsbUJBQW1CO0FBQUEsUUFDL0M7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUN6RCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQy9DLFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNyRCxTQUFTLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDN0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFdBQVcsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxJQUNuRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
