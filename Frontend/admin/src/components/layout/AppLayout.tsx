import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '@/components/ui/toaster';
import { useUIStore } from '@/store';
import { useEffect } from 'react';

export function AppLayout() {
  const { theme, sidebarCollapsed } = useUIStore();

  // Apply theme on mount
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <SidebarProvider defaultOpen={!sidebarCollapsed}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto bg-gradient-subtle">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}