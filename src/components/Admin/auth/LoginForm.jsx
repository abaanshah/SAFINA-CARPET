import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm({ login, isLoading, toast }) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@safinacarpets.com',
      password: 'admin123',
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast({
        title: 'Login successful',
        description: 'Welcome to SAFINA CARPETS Admin Panel',
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#f8f9fa' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '64px', height: '64px', background: '#f87171', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>SC</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SAFINA CARPETS</h1>
          <p style={{ color: '#6c757d' }}>Admin Panel</p>
        </div>

        <div style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)', border: '1px solid #dee2e6', borderRadius: '8px', padding: '1.5rem' }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center' }}>Welcome Back</h2>
            <p style={{ fontSize: '0.875rem', textAlign: 'center', color: '#6c757d', marginBottom: '1rem' }}>Sign in to your admin account</p>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@safinacarpets.com"
                {...form.register('email')}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
              {form.formState.errors.email && (
                <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{form.formState.errors.email.message}</p>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...form.register('password')}
                  style={{ width: '100%', padding: '0.5rem 2.5rem 0.5rem 0.5rem', borderRadius: '4px', border: '1px solid #ced4da' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {form.formState.errors.password && (
                <p style={{ color: '#dc3545', fontSize: '0.875rem' }}>{form.formState.errors.password.message}</p>
              )}
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#f1f3f5', borderRadius: '6px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                <strong>Demo Credentials:</strong><br />
                Email: admin@safinacarpets.com<br />
                Password: admin123
              </p>
            </div>

            <button
              type="submit"
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f87171', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          <p>&copy; 2024 SAFINA CARPETS. All rights reserved.</p>
          <p style={{ marginTop: '0.25rem' }}>Mughal-era craftsmanship since 1970</p>
        </div>
      </div>
    </div>
  );
}
