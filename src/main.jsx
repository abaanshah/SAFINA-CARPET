import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/jost/200.css"; 
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>   {/* ✅ wrap App inside AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
