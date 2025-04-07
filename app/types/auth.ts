export type UserRole = 'USER' | 'ADMIN' | 'VENDOR';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  isEmailVerified: boolean;
  avatar?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface AuthError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface EmailVerificationData {
  email: string;
  code: string;
}

export interface PasswordResetRequestData {
  email: string;
}

export interface PasswordResetData {
  email: string;
  otp: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  expiresIn: number;
} 