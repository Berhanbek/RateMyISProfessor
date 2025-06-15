import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'ratemyisprofessor-1-bn3e.onrender.com'
    ]
  }
});