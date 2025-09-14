import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useAuthStore } from '@/store';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@safinacarpets.com',
      password: 'admin123',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">SC</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">SAFINA CARPETS</h1>
          <p className="text-muted-foreground">Admin Panel</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-elegant border-border">
          <CardHeader className="space-y-1">
            <h2 className="text-xl font-semibold text-center text-card-foreground">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to your admin account
            </p>
          </CardHeader>
          
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@safinacarpets.com"
                  {...form.register('email')}
                  className="bg-background border-input"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...form.register('password')}
                    className="bg-background border-input pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Demo credentials info */}
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Demo Credentials:</strong><br />
                  Email: admin@safinacarpets.com<br />
                  Password: admin123
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SAFINA CARPETS. All rights reserved.</p>
          <p className="mt-1">Mughal-era craftsmanship since 1970</p>
        </div>
      </div>
    </div>
  );
}