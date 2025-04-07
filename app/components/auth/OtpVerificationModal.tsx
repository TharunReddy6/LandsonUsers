'use client';

import React, { useState, useRef, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { colors } from '@/app/styles/theme';

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  email: string;
  title?: string;
  description?: string;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  onResend,
  email,
  title = 'Verify Your Email',
  description = 'We\'ve sent a 6-digit verification code to your email. Enter the code below to verify your email address.'
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Set up the countdown timer
  useEffect(() => {
    if (!isOpen) return;

    setCountdown(60);
    setResendDisabled(true);
    
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset OTP and errors when modal is opened
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setError(null);
      setActiveInput(0);
      // Focus the first input when modal opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (value: string, index: number) => {
    // Only accept numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // If input has a value and it's not the last input, move to next
    if (value !== '' && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // If backspace and empty, move to previous input
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // If pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus the last input
      setActiveInput(5);
      inputRefs.current[5]?.focus();
    }
  };

  // Handle OTP verification
  const handleVerify = async () => {
    setError(null);
    const otpValue = otp.join('');
    
    // Validate that OTP is complete
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onVerify(otpValue);
      onClose();
    } catch (error: any) {
      setError(error.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setError(null);
    
    try {
      setIsLoading(true);
      await onResend();
      
      // Reset countdown
      setCountdown(60);
      setResendDisabled(true);
      
      // Clear OTP fields
      setOtp(['', '', '', '', '', '']);
      setActiveInput(0);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      setError(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="none"
                stroke={colors.primary.main}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            {description}
          </p>

          <div className="text-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Verification code sent to:</span>
            <div className="text-xs sm:text-sm font-bold text-gray-700 truncate max-w-[250px] mx-auto">{email}</div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-2 sm:p-3 rounded-md text-xs sm:text-sm border border-red-200"
          >
            {error}
          </motion.div>
        )}

        <div className="flex justify-center gap-1 sm:gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              onFocus={() => setActiveInput(index)}
              className={`w-11 h-12 text-center text-xl font-semibold border rounded-md 
                ${activeInput === index 
                  ? 'border-green-500 ring-1 ring-green-500' 
                  : 'border-gray-300'} 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          fullWidth
          isLoading={isLoading}
          disabled={otp.join('').length !== 6 || isLoading}
        >
          Verify
        </Button>

        <div className="text-center text-sm">
          <p className="text-gray-600 mb-1">
            Didn't receive a code?
          </p>
          {resendDisabled ? (
            <p className="text-gray-500">
              Resend code in <span className="font-medium">{countdown}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading || resendDisabled}
              className={`text-green-600 font-medium hover:text-green-700 ${
                isLoading || resendDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OtpVerificationModal; 