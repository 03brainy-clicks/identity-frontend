import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Don't forget to import path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Use an object instead of an array
    },
  },
});
