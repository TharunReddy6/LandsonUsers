'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/app/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full',
    full: 'w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 text-center">
            {/* Backdrop with glassy effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 backdrop-blur-sm bg-white/20 dark:bg-green-900/20"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              {/* Gradient patterns for polymorphism effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[40%] -left-[20%] h-[500px] w-[500px] rounded-full bg-green-100/20 blur-3xl"></div>
                <div className="absolute -bottom-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-green-200/20 blur-3xl"></div>
                <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl"></div>
              </div>
            </motion.div>

            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
              className={`relative rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 text-left shadow-xl transition-all 
                ${sizeClasses[size]} mx-auto 
                backdrop-blur-sm bg-white/90 border border-white/20 dark:border-green-50/10 z-10
                max-h-[90vh] overflow-y-auto no-scrollbar`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Green glass header accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl sm:rounded-t-2xl"
                style={{ 
                  background: `linear-gradient(to right, ${colors.primary.light}, ${colors.primary.main}, ${colors.primary.dark})` 
                }}
              ></div>
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/50 to-green-50/30 pointer-events-none"></div>

              {/* Close button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 z-10"
                  aria-label="Close"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* Title */}
              {title && (
                <div className="relative mb-3 sm:mb-4 text-center z-10">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900" style={{ color: colors.primary.main }}>
                    {title}
                  </h3>
                </div>
              )}

              {/* Content */}
              <div className="relative mt-2 z-10">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Add this at the end of your CSS
const globalStyles = `
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

// Add the global styles
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = globalStyles;
  document.head.appendChild(styleEl);
}

export default Modal; 