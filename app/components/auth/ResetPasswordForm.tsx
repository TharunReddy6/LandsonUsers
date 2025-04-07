'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { colors } from '@/app/styles/theme';

const ResetPasswordForm: React.FC = () => {
  const { resetPassword, isLoading, error, setError, setAuthMode } = useAuthStore();
  const [formData, setFormData] = useState({
    otp: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.otp) {
      setError('Please enter the verification code');
      return false;
    }
    
    if (!formData.email) {
      setError('Please enter your email');
      return false;
    }

    if (!formData.password) {
      setError('Please enter a new password');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await resetPassword(formData.email, formData.otp, formData.password);
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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {isSubmitted ? 'Password Reset Complete' : 'Create New Password'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isSubmitted 
            ? "Your password has been reset successfully" 
            : "Enter the verification code and set your new password"}
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
            Success!
          </p>
          <p className="mt-1 text-xs sm:text-sm">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <div className="mt-4 sm:mt-6">
            <Button
              onClick={() => setAuthMode('login')}
              fullWidth
              className="py-2.5 sm:py-3 font-medium text-sm sm:text-base"
            >
              Go to login
            </Button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <motion.div variants={itemVariants}>
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter the email you used"
              required
              fullWidth
              className="bg-gray-50 focus:bg-white transition-colors"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Input
              label="Verification Code"
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter the 6-digit code"
              required
              fullWidth
              className="bg-gray-50 focus:bg-white transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              label="New Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a new password"
              required
              fullWidth
              className="bg-gray-50 focus:bg-white transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              fullWidth
              className="bg-gray-50 focus:bg-white transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-2 sm:mt-4">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="py-2.5 sm:py-3 font-medium text-sm sm:text-base"
            >
              Reset Password
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

export default ResetPasswordForm; 