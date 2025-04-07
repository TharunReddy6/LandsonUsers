'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { colors } from '../styles/theme';
import { motion } from 'framer-motion';
import ProfileDropdown from './ui/ProfileDropdown';
import Button from './ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, setShowAuthModal, setAuthMode } = useAuthStore();

  const handleAuthClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  // Get user's full name
  const getUserFullName = () => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  };

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold" style={{ color: colors.primary.main }}>
                Landson Agri
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600">
              Contact
            </Link>
            {isAuthenticated && user ? (
              <ProfileDropdown 
                userName={getUserFullName()} 
                userEmail={user.email}
                userAvatar={user.avatar} 
              />
            ) : (
              <Button
                onClick={handleAuthClick}
                variant="primary"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        className="md:hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/products"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600"
          >
            Contact
          </Link>
          {isAuthenticated && user ? (
            <div className="px-3 py-2">
              <div className="flex items-center mb-2">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={getUserFullName()} 
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white mr-2 font-medium">
                    {getUserInitials()}
                  </div>
                )}
                <span className="text-gray-700">{getUserFullName()}</span>
              </div>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-green-600"
              >
                Your Profile
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-green-600"
              >
                Your Orders
              </Link>
              <button
                onClick={() => useAuthStore.getState().logout()}
                className="mt-2 block w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700"
            >
              Login
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;