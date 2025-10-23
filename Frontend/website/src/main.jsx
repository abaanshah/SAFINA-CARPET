// FILE: src/main.jsx (Updated Position)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from 'react-hot-toast';
import './index.css';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
// import "@fontsource/jost/200.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CurrencyProvider>
            <Toaster 
              // --- CHANGED THIS LINE ---
              position="top-center"
              reverseOrder={false}
            />
            <App />
            </CurrencyProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);