/**
 * ResetPassword Page - Reset password with token
 */
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
// Removed old AuthLayout import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    setIsLoading(true);
    try {
      await apiClient.resetPassword({
        token,
        new_password: data.password,
      });
      setPasswordReset(true);
      toast.success('Password reset successful!');
    } catch (error: any) {
      const message = error?.message || 'Failed to reset password. The link may have expired.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (passwordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-secondary/30 p-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">
              All set!
            </p>
            <p className="text-foreground">
              Your password has been changed successfully.
              You can now sign in with your new password.
            </p>
          </div>

          <Button
            onClick={() => navigate('/auth')}
            className="w-full"
          >
            Continue to Sign In
          </Button>
        </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-secondary/30 p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
            PoleStar
          </h1>
          <p className="text-muted-foreground text-sm">Steel Transmission Pole Design Software</p>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
        <p className="text-muted-foreground mb-8">Create a new password for your account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10"
              {...register('password')}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">
            Confirm New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10"
              {...register('confirmPassword')}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-secondary/30 p-3 rounded-lg border border-border">
          <p className="text-xs text-foreground mb-1">
            Password must contain:
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• At least 8 characters</li>
            <li>• One uppercase letter</li>
            <li>• One lowercase letter</li>
            <li>• One number</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            'Reset Password'
          )}
        </Button>

        <div className="text-center pt-4 border-t border-border">
          <Link
            to="/auth"
            className="text-sm text-primary hover:text-primary-dark"
          >
            Remember your password? Sign in
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}

