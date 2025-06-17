import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'your-frontend-service.onrender.com' // <-- Replace with your actual Render frontend domain
    ]
  }
});