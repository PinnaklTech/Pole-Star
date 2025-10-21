/**
 * ForgotPassword Page - Request password reset
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
// Removed old AuthLayout import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await apiClient.forgotPassword(data);
      setEmailSent(true);
      toast.success('Password reset instructions sent!');
    } catch (error: any) {
      const message = error?.message || 'Failed to send reset email. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
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
            <p className="text-foreground">
              We've sent password reset instructions to:
            </p>
            <p className="font-semibold text-foreground">
              {email}
            </p>
          </div>

          <div className="bg-secondary/30 border border-border rounded-lg p-4 text-sm text-foreground">
            <p className="mb-2">
              <strong>What's next?</strong>
            </p>
            <ol className="text-left space-y-1 list-decimal list-inside">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the reset link in the email</li>
              <li>Create your new password</li>
            </ol>
          </div>

          <p className="text-sm text-muted-foreground">
            The reset link will expire in <strong>15 minutes</strong>.
          </p>

          <div className="pt-4 space-y-3">
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full"
            >
              Resend Email
            </Button>

            <Link to="/auth" className="block">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
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
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h2>
        <p className="text-muted-foreground mb-8">No worries, we'll send you reset instructions</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              {...register('email')}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div className="bg-warning/20 border border-warning rounded-lg p-3 text-sm text-foreground">
          <p>
            💡 Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Reset Instructions'
          )}
        </Button>

        <div className="text-center pt-4 border-t border-border">
          <Link
            to="/auth"
            className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}

