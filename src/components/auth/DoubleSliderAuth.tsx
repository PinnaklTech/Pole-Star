/**
 * DoubleSliderAuth - Classic double slider authentication UI
 * Based on Florin Pop's sliding overlay panel design
 */
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./DoubleSliderAuth.css";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export function DoubleSliderAuth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup";
  const [rightPanelActive, setRightPanelActive] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Mobile Toggle Buttons */}
      <div className="mobile-toggle">
        <button
          onClick={() => setRightPanelActive(false)}
          className={`mobile-toggle-btn ${!rightPanelActive ? "active" : ""}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setRightPanelActive(true)}
          className={`mobile-toggle-btn ${rightPanelActive ? "active" : ""}`}
        >
          Sign Up
        </button>
      </div>

      <div className={`auth-container ${rightPanelActive ? "right-panel-active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="auth-form">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Register with your details</p>

            <div className="input-group">
              <Label htmlFor="signup-name" className="sr-only">Full Name</Label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Full Name"
                  className="auth-input"
                  {...signupForm.register("name")}
                  disabled={isLoading}
                />
              </div>
              {signupForm.formState.errors.name && (
                <p className="error-text">{signupForm.formState.errors.name.message}</p>
              )}
            </div>

            <div className="input-group">
              <Label htmlFor="signup-email" className="sr-only">Email</Label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Email"
                  className="auth-input"
                  {...signupForm.register("email")}
                  disabled={isLoading}
                />
              </div>
              {signupForm.formState.errors.email && (
                <p className="error-text">{signupForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="input-group">
              <Label htmlFor="signup-password" className="sr-only">Password</Label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="auth-input"
                  {...signupForm.register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {signupForm.formState.errors.password && (
                <p className="error-text">{signupForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="input-group">
              <Label htmlFor="signup-confirm" className="sr-only">Confirm Password</Label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <Input
                  id="signup-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="auth-input"
                  {...signupForm.register("confirmPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {signupForm.formState.errors.confirmPassword && (
                <p className="error-text">{signupForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="auth-form">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Use your account credentials</p>

            <div className="input-group">
              <Label htmlFor="signin-email" className="sr-only">Email</Label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Email"
                  className="auth-input"
                  {...loginForm.register("email")}
                  disabled={isLoading}
                />
              </div>
              {loginForm.formState.errors.email && (
                <p className="error-text">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="input-group">
              <Label htmlFor="signin-password" className="sr-only">Password</Label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="auth-input"
                  {...loginForm.register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="error-text">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="forgot-password-link"
            >
              Forgot your password?
            </button>

            <Button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="overlay-title">Welcome Back!</h1>
              <p className="overlay-text">
                To keep connected with us please login with your personal info
              </p>
              <div className="overlay-brand">
                <div className="brand-divider" />
                <h3 className="brand-name">PoleStar</h3>
                <p className="brand-tagline">Professional Steel Transmission Pole Design Software</p>
              </div>
              <Button
                onClick={() => setRightPanelActive(false)}
                variant="outline"
                className="overlay-button"
              >
                Sign In
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="overlay-title">Welcome To PoleStar</h1>
              <p className="overlay-text">
                Enter your personal details and start your journey with us
              </p>
              <div className="overlay-brand">
                <div className="brand-divider" />
                <h3 className="brand-name">PoleStar</h3>
                <p className="brand-tagline">Professional Steel Transmission Pole Design Software</p>
              </div>
              <Button
                onClick={() => setRightPanelActive(true)}
                variant="outline"
                className="overlay-button"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="auth-footer">
        © 2025 PoleStar. Professional Engineering Software By{" "}
        <a
          href="https://pinnakltech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          PinnaklTech
        </a>
        .
      </p>
    </div>
  );
}
