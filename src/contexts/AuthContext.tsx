/**
 * Authentication Context Provider
 * Manages user authentication state and provides auth methods throughout the app
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginCredentials, SignupData } from '@/types/auth';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (token && storedUser) {
        // Set token in API client
        apiClient.setToken(token);
        
        // Verify token is still valid
        try {
          const currentUser = await apiClient.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          apiClient.setToken('');
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.login(credentials);
      
      // Store token and user
      localStorage.setItem(TOKEN_KEY, response.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      
      // Set token in API client
      apiClient.setToken(response.access_token);
      
      // Update state
      setUser(response.user);
      
      toast.success('Welcome back!');
    } catch (error: any) {
      const message = error?.message || 'Login failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const response = await apiClient.signup(data);
      
      // Store token and user
      localStorage.setItem(TOKEN_KEY, response.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      
      // Set token in API client
      apiClient.setToken(response.access_token);
      
      // Update state
      setUser(response.user);
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error?.message || 'Signup failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint
      await apiClient.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout error:', error);
    } finally {
      // Clear storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      
      // Clear token from API client
      apiClient.setToken('');
      
      // Update state
      setUser(null);
      
      toast.success('Logged out successfully');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

