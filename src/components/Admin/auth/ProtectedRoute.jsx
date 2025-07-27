import { useAuthStore } from '@/store';
import { LoginForm } from './LoginForm';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-pink-500 rounded-xl flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl font-bold text-white">SC</span>
          </div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
