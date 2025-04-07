'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { apiRequest, setupTokenRefresh } from './utils/api';
import { User } from './types/auth';
import Spinner from './components/ui/Spinner';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const { isAuthenticated, user, setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Start token refresh mechanism on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setupTokenRefresh();
    }
  }, []);

  // Load user on startup if access token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if we have an access token in local storage
        const accessToken = localStorage.getItem('landson_access_token');
        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        try {
          // Try to fetch the user profile
          const user = await apiRequest<User>('/users/profile', {
            method: 'GET',
            includeAuth: true
          });
          
          // Update auth store with the user data
          setUser(user);
          setIsLoading(false);
        } catch (error: any) {
          console.error('Failed to load user profile:', error);
          
          // If token refresh failed (handled in apiRequest), just log the user out
          if (error.status === 401) {
            logout();
          }
          
          setIsLoading(false);
        }
      } catch (e) {
        // Handle any other errors (like localStorage access)
        console.error('Error in loadUser:', e);
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Providers; 