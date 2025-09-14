// ===================================================================
// FILE: admin/src/store/index.ts (FINAL, COMPLETE, AND CORRECTED)
// ===================================================================
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { DashboardStats, AppSettings } from '@/types'; // Your original types are kept

// This User type matches your actual backend user object
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// THIS IS THE CORRECTED AUTH STORE THAT SOLVES THE LOGIN PROBLEM
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        login: (token, user) => { // <-- Add the login function
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          set({ user, token });
        },
        logout: () => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          set({ user: null, token: null });
          window.location.href = 'http://localhost:5173/login';
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => ({
          getItem: (name) => {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            return JSON.stringify({
              state: {
                user: user ? JSON.parse(user) : null,
                token: token,
              },
            });
          },
          setItem: (name, value) => {
            // The admin panel only READS auth state, it never sets it.
            // The main website is responsible for setting it.
          },
          removeItem: (name) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          },
        })),
      }
    ),
    { name: 'auth-store' }
  )
);

// --- YOUR ORIGINAL, UNTOUCHED CODE FOR OTHER STORES IS BELOW ---
interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

interface AppState {
  dashboardStats: DashboardStats | null;
  settings: AppSettings;
  setDashboardStats: (stats: DashboardStats) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

// UI Store
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        sidebarCollapsed: false,
        theme: 'light',
        toggleSidebar: () => {
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
        },
        setSidebarCollapsed: (collapsed: boolean) => {
          set({ sidebarCollapsed: collapsed });
        },
        setTheme: (theme: 'light' | 'dark' | 'system') => {
          set({ theme });
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            return;
          }
          root.classList.add(theme);
        }
      }),
      {
        name: 'ui-storage',
      }
    ),
    { name: 'ui-store' }
  )
);

// App Store
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      dashboardStats: null,
      settings: {
        companyName: 'SAFINA CARPETS',
        currency: 'INR',
        taxRate: 18,
        theme: 'light',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          orderUpdates: true,
          lowStock: true
        }
      },
      setDashboardStats: (stats: DashboardStats) => {
        set({ dashboardStats: stats });
      },
      updateSettings: (newSettings: Partial<AppSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      }
    }),
    { name: 'app-store' }
  )
);