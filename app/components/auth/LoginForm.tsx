'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { colors } from '@/app/styles/theme';

const LoginForm: React.FC = () => {
  const { login, isLoading, error, setError, setAuthMode, resendVerification, pendingEmail } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleResendVerification = async () => {
    if (pendingEmail) {
      await resendVerification(pendingEmail);
    } else {
      setError('Email address is missing. Please try logging in again.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div 
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-4 sm:mb-6"
        variants={itemVariants}
      >
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
              style={{ color: colors.primary.main }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Sign in to your Landson Agri account</p>
      </motion.div>

      {error && (
        <motion.div 
          className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg mb-4 text-xs sm:text-sm border border-red-200 flex items-start sm:items-center flex-wrap sm:flex-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            {error}
            {error.includes('not verified') && pendingEmail && (
              <button
                onClick={handleResendVerification}
                className="block sm:inline-block mt-2 sm:mt-0 ml-0 sm:ml-2 underline text-red-700 hover:text-red-800 font-medium"
              >
                Resend verification email
              </button>
            )}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <motion.div variants={itemVariants}>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            fullWidth
            className="bg-gray-50 focus:bg-white transition-colors"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            fullWidth
            className="bg-gray-50 focus:bg-white transition-colors"
          />
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm mt-1 sm:mt-2 mb-4 sm:mb-6"
          variants={itemVariants}
        >
          <label className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer mb-2 sm:mb-0">
            <input
              type="checkbox"
              className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-green-600 hover:text-green-800 font-medium transition-colors"
            onClick={() => setAuthMode('forgotPassword')}
          >
            Forgot password?
          </button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="py-2.5 sm:py-3 font-medium text-sm sm:text-base"
          >
            Sign in
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          {/* Social login options */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </form>

      <motion.div 
        className="mt-4 sm:mt-6 text-center"
        variants={itemVariants}
      >
        <p className="text-xs sm:text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-green-600 hover:text-green-800 font-medium transition-colors"
            onClick={() => setAuthMode('register')}
          >
            Create an account
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm; 