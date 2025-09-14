// ===================================================================
// FILE: admin/src/components/auth/ProtectedRoute.tsx (FINAL VERSION)
// ===================================================================
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give the store a brief moment to hydrate from localStorage on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // A small delay to prevent flickering

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Authenticating...</div>;
  }

  // After loading, check if the user from the store is an admin
  if (user && user.isAdmin) {
    return <>{children}</>; // If yes, show the admin panel
  } 
  
  // If not an admin, redirect to the main website's login page
  window.location.href = 'http://localhost:5173/login';
  return null; // Render nothing while the browser redirects
}