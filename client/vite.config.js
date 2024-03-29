import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://real-estate-api-tau.vercel.app', // Use HTTP instead of HTTPS
        secure: false, // Disable SSL verification
      },
    },
  },

  plugins: [react()],
});