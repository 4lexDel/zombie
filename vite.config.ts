import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    open: true,
  },
  optimizeDeps: {
    exclude: ['reflect-metadata.js']
  }
});
