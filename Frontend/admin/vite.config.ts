import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    // --- ADDED: Proxy configuration to forward API requests ---
    proxy: {
      // Any request starting with '/api' will be sent to the backend
      '/api': {
        target: 'http://localhost:5001', // Your backend server address
        changeOrigin: true, // Recommended for security and avoiding CORS issues
        secure: false,      // Can be useful if your backend is not using HTTPS in dev
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
