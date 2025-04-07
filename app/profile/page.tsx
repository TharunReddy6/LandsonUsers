'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import { User } from '@/app/types/auth';
import { apiRequest, getTokenTimeRemaining } from '@/app/utils/api';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Spinner from '@/app/components/ui/Spinner';
import { colors } from '@/app/styles/theme';

const ProfilePage = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<Partial<User> | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [tokenTimer, setTokenTimer] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        router.push('/');
        return;
      }

      try {
        setIsLoading(true);
        const userData = await apiRequest<User>('/users/profile');
        setProfileData({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          avatar: userData.avatar,
          role: userData.role,
          isEmailVerified: userData.isEmailVerified,
        });
      } catch (error: any) {
        setError(error.message || 'Failed to load profile');
        if (error.status === 401) {
          logout();
          router.push('/');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, router, logout]);

  // Add effect for token refresh countdown
  useEffect(() => {
    if (activeTab !== 'security') return;

    // Force immediate update of token timer when switching to security tab
    const timer = getTokenTimeRemaining();
    if (timer.minutes !== tokenTimer.minutes || timer.seconds !== tokenTimer.seconds) {
      setTokenTimer(timer);
    }

    const updateTimer = () => {
      setTokenTimer(getTokenTimeRemaining());
    };

    // Update every second
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [activeTab, tokenTimer]);

  // Force refresh token timer whenever user is authenticated
  useEffect(() => {
    if (isAuthenticated && activeTab === 'security') {
      setTokenTimer(getTokenTimeRemaining());
    }
  }, [isAuthenticated, activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => prev ? { ...prev, [name]: value } : null);
    // Clear messages when user types
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const updatedUser = await apiRequest<User>('/users/profile', {
        method: 'PATCH',
        body: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phoneNumber: profileData.phoneNumber,
        },
      });

      setProfileData({
        ...profileData,
        ...updatedUser,
      });
      
      // Update global user state
      useAuthStore.getState().setUser(updatedUser);
      
      setSuccess('Profile updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Function to render the avatar with fallback
  const renderAvatar = () => {
    if (profileData?.avatar) {
      return (
        <img 
          src={profileData.avatar} 
          alt={`${profileData.firstName} ${profileData.lastName}`} 
          className="w-full h-full object-cover"
        />
      );
    }
    
    // Generate initials for the fallback
    const initials = profileData ? 
      `${profileData.firstName?.charAt(0) || ''}${profileData.lastName?.charAt(0) || ''}`.toUpperCase() 
      : '';

    return (
      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold">
        {initials}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center mb-4">
          <Spinner size="lg" />
        </div>
        <p className="text-gray-600 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-md">
          <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Error</h2>
          <p className="text-red-600 mb-6">{error || 'Failed to load profile data'}</p>
          <Button 
            onClick={() => router.push('/')}
            fullWidth
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Profile header */}
          <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-600">
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-8 flex">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                {renderAvatar()}
              </div>
              <div className="ml-6 mt-auto mb-4 text-white">
                <h1 className="text-2xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
                <p className="text-green-100">{profileData.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs and content */}
          <div className="pt-24 pb-8 px-8">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'security'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Security
                </button>
              </nav>
            </div>

            {/* Notifications */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-medium">Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md flex items-start">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-medium">Success</h3>
                  <p>{success}</p>
                </div>
              </div>
            )}

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName || ''}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 focus:ring-green-500 focus:border-green-500"
                    />
                    <Input
                      label="Last Name"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName || ''}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      id="email"
                      name="email"
                      value={profileData.email || ''}
                      readOnly
                      disabled
                      className="bg-gray-100 text-gray-700 border-gray-300"
                    />
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <Input
                          label="Phone Number"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={profileData.phoneNumber || ''}
                          onChange={handleChange}
                          className="bg-white border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div className="ml-2 mt-6">
                        {profileData.isEmailVerified ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            Unverified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    disabled={isSaving}
                    className="px-6"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}

            {/* Security Tab Content */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Session Information</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Token Refresh</h3>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Next refresh in:</span>
                        <div className="bg-white px-3 py-1 rounded-md border border-gray-200 flex items-center">
                          <div className="flex items-center text-green-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-mono font-medium">
                              {String(tokenTimer.minutes).padStart(2, '0')}:{String(tokenTimer.seconds).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-linear" 
                        style={{ 
                          width: `${Math.min(100, ((tokenTimer.minutes * 60 + tokenTimer.seconds) / (10 * 60)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Your session token is automatically refreshed every 10 minutes to maintain your login status.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
                  <p className="text-gray-600 mb-6">
                    Password management and account security settings will be available soon.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-700">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p>
                          For security reasons, password changes must be done through the "Forgot Password" flow on the login screen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Account Activity</h2>
                  <div className="flex items-center justify-center py-4">
                    <p className="text-gray-500 text-sm">Account activity log will be available in a future update.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 