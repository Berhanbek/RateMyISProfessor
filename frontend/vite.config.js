import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['https://ratemyisprofessor-2-7ck5.onrender.com/']
  }
});