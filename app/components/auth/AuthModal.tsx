'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import OtpVerificationModal from './OtpVerificationModal';
import Modal from '../ui/Modal';

const AuthModal: React.FC = () => {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    authMode, 
    pendingEmail,
    showOtpModal,
    setShowOtpModal,
    verifyEmail,
    resendVerification,
    resetPassword,
    setError
  } = useAuthStore();
  
  // State to track viewport size
  const [isMobile, setIsMobile] = useState(false);
  
  // Set up viewport size listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Check on initial load
    checkMobile();
    
    // Set up listener for resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const renderForm = () => {
    switch (authMode) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm />;
      case 'forgotPassword':
        return <ForgotPasswordForm />;
      case 'resetPassword':
        return <ResetPasswordForm />;
      case 'verifyEmail':
        return <LoginForm />;
      default:
        return <LoginForm />;
    }
  };

  const getTitle = () => {
    switch (authMode) {
      case 'login':
        return 'Sign In';
      case 'register':
        return 'Create Account';
      case 'forgotPassword':
        return 'Reset Password';
      case 'resetPassword':
        return 'Create New Password';
      case 'verifyEmail':
        return 'Verify Email';
      default:
        return 'Authentication';
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!pendingEmail) {
      setError('Email address is missing. Please try again.');
      return;
    }

    if (authMode === 'verifyEmail') {
      await verifyEmail(pendingEmail, otp);
    } else if (authMode === 'resetPassword') {
      // This will be handled differently if we're resetting password
      return;
    }
  };

  const handleResendOtp = async () => {
    if (!pendingEmail) {
      setError('Email address is missing. Please try again.');
      return;
    }

    await resendVerification(pendingEmail);
  };

  const getOtpTitle = () => {
    if (authMode === 'verifyEmail') {
      return 'Verify Your Email';
    } else if (authMode === 'resetPassword') {
      return 'Reset Password';
    }
    return 'Verification Required';
  };

  const getOtpDescription = () => {
    if (authMode === 'verifyEmail') {
      return 'We\'ve sent a 6-digit verification code to your email. Enter the code below to verify your email address.';
    } else if (authMode === 'resetPassword') {
      return 'We\'ve sent a 6-digit verification code to your email. Enter the code below to reset your password.';
    }
    return 'Please enter the verification code sent to your email.';
  };

  // Determine modal size based on screen and form type
  const getModalSize = () => {
    if (isMobile) {
      return "full";
    }
    
    if (authMode === 'register') {
      return "md";
    }
    
    return "sm";
  };

  return (
    <>
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title={getTitle()}
        size={getModalSize()}
      >
        {renderForm()}
      </Modal>

      {pendingEmail && (
        <OtpVerificationModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          email={pendingEmail}
          title={getOtpTitle()}
          description={getOtpDescription()}
        />
      )}
    </>
  );
};

export default AuthModal; 