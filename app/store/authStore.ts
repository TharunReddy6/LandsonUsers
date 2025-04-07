import { create } from 'zustand';
import { apiRequest } from '../utils/api';
import { 
  User, 
  LoginResponse, 
  AuthError,
  LoginData,
  RegistrationData,
  EmailVerificationData,
  PasswordResetRequestData,
  PasswordResetData
} from '../types/auth';

export type AuthMode = 'login' | 'register' | 'forgotPassword' | 'resetPassword' | 'verifyEmail';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showAuthModal: boolean;
  authMode: AuthMode;
  pendingEmail: string | null;
  resetToken: string | null;
  isLoading: boolean;
  error: string | null;
  showOtpModal: boolean;
  
  // Modal control functions
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: AuthMode) => void;
  setPendingEmail: (email: string | null) => void;
  setShowOtpModal: (show: boolean) => void;
  
  // Auth functions
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string, phoneNumber: string) => Promise<boolean>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, otp: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  
  // Error handling
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  showAuthModal: false,
  authMode: 'login',
  pendingEmail: null,
  resetToken: null,
  isLoading: false,
  error: null,
  showOtpModal: false,
  
  // Modal control functions
  setShowAuthModal: (show) => set({ showAuthModal: show }),
  setAuthMode: (mode) => set({ authMode: mode, error: null }),
  setPendingEmail: (email) => set({ pendingEmail: email }),
  setShowOtpModal: (show) => set({ showOtpModal: show }),
  
  // Auth functions
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data: LoginResponse = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password } as LoginData,
        includeAuth: false
      });
      
      // Store tokens
      localStorage.setItem('landson_access_token', data.accessToken);
      localStorage.setItem('landson_refresh_token', data.refreshToken);
      
      // Set expiry time in milliseconds (from current time)
      // Ensure expiresIn is a valid number, default to 10 minutes if not
      const expiresInMs = (typeof data.expiresIn === 'number' && !isNaN(data.expiresIn) && data.expiresIn > 0) 
        ? data.expiresIn * 1000 
        : 10 * 60 * 1000; // Default to 10 minutes
      const expiryTime = Date.now() + expiresInMs;
      localStorage.setItem('landson_token_expiry', expiryTime.toString());
      
      // Set authentication state
      set({ 
        isAuthenticated: true, 
        user: data.user, 
        showAuthModal: false,
        isLoading: false
      });
      
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      
      // Handle specific error cases
      if (authError.status === 401 && authError.message.includes('verified')) {
        // Email not verified
        set({ 
          error: 'Your email is not verified. Please verify your email to continue.', 
          isLoading: false,
          pendingEmail: email,
          authMode: 'verifyEmail'
        });
      } else {
        // General error
        set({ 
          error: authError.message || 'An error occurred during login', 
          isLoading: false 
        });
      }
      return false;
    }
  },
  
  register: async (firstName, lastName, email, password, phoneNumber) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: { firstName, lastName, email, password, phoneNumber } as RegistrationData,
        includeAuth: false
      });
      
      // Set state for email verification
      set({ 
        isLoading: false,
        pendingEmail: email,
        authMode: 'verifyEmail',
        showOtpModal: true
      });
      
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      set({ 
        error: authError.message || 'An error occurred during registration', 
        isLoading: false 
      });
      return false;
    }
  },
  
  verifyEmail: async (email, code) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/auth/verify-email', {
        method: 'POST',
        body: { email, code } as EmailVerificationData,
        includeAuth: false
      });
      
      // After verification, return to login
      set({ 
        isLoading: false,
        showOtpModal: false,
        authMode: 'login',
        error: null
      });
      
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      set({ 
        error: authError.message || 'Failed to verify email', 
        isLoading: false 
      });
      return false;
    }
  },
  
  resendVerification: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/auth/resend-verification', {
        method: 'POST',
        body: { email },
        includeAuth: false
      });
      
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      set({ 
        error: authError.message || 'Failed to resend verification email', 
        isLoading: false 
      });
      return false;
    }
  },
  
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/auth/request-password-reset', {
        method: 'POST',
        body: { email } as PasswordResetRequestData,
        includeAuth: false
      });
      
      // Move to OTP verification screen
      set({ 
        isLoading: false,
        pendingEmail: email,
        showOtpModal: true
      });
      
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      set({ 
        error: authError.message || 'Failed to send password reset email', 
        isLoading: false 
      });
      return false;
    }
  },
  
  resetPassword: async (email, otp, password) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: { email, otp, password } as PasswordResetData,
        includeAuth: false
      });
      
      // Return to login screen
      set({ 
        isLoading: false,
        authMode: 'login',
        showOtpModal: false,
        error: null
      });
      
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      set({ 
        error: authError.message || 'Failed to reset password', 
        isLoading: false 
      });
      return false;
    }
  },
  
  logout: () => {
    // Remove auth tokens
    localStorage.removeItem('landson_access_token');
    localStorage.removeItem('landson_refresh_token');
    localStorage.removeItem('landson_token_expiry');
    
    set({ 
      isAuthenticated: false, 
      user: null 
    });
  },
  
  setUser: (user) => {
    set({ 
      isAuthenticated: true,
      user
    });
  },
  
  // Error handling
  setError: (error) => set({ error })
})); 