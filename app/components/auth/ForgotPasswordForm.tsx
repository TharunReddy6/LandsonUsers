'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { colors } from '@/app/styles/theme';

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error, setError, setAuthMode } = useAuthStore();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // Clear errors when typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await forgotPassword(email);
    if (success) {
      setIsSubmitted(true);
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isSubmitted 
            ? "We've sent you an email with a verification code" 
            : "Enter your email and we'll send you a verification code"}
        </p>
      </motion.div>

      {error && (
        <motion.div 
          className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg mb-4 text-xs sm:text-sm border border-red-200 flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}

      {isSubmitted ? (
        <motion.div 
          className="bg-green-50 text-green-700 p-4 sm:p-5 rounded-lg mb-4 sm:mb-6 border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <p className="font-medium text-sm sm:text-base">
            Check your email
          </p>
          <p className="mt-1 text-xs sm:text-sm">
            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>. Enter the code on the next screen to reset your password.
          </p>
          <div className="mt-4 sm:mt-6">
            <Button
              onClick={() => setAuthMode('login')}
              fullWidth
              className="py-2.5 sm:py-3 font-medium text-sm sm:text-base"
            >
              Back to login
            </Button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <motion.div variants={itemVariants}>
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              fullWidth
              className="bg-gray-50 focus:bg-white transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="py-2.5 sm:py-3 font-medium text-sm sm:text-base"
            >
              Send Reset Code
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-4 sm:mt-6 text-center"
            variants={itemVariants}
          >
            <p className="text-xs sm:text-sm text-gray-600">
              <button
                type="button"
                className="text-green-600 hover:text-green-800 font-medium transition-colors"
                onClick={() => setAuthMode('login')}
              >
                Back to login
              </button>
            </p>
          </motion.div>
        </form>
      )}
    </motion.div>
  );
};

export default ForgotPasswordForm; 