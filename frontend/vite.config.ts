import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/DhandapaniFarmer_Business_Website-/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-router-dom', 'framer-motion', 'swiper', '@emailjs/browser'],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          swiper: ['swiper'],
        },
      },
    },
  },
});
