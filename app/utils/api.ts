const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.landsonagri.in/api/v1';

// Track token expiration
let tokenExpiry = 0;
const TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  includeAuth?: boolean;
}

// Helper to check if token needs refresh
function isTokenExpired(): boolean {
  // Always get the latest expiry time from localStorage
  updateTokenExpiryFromStorage();
  
  const now = Date.now();
  return now >= tokenExpiry - 30000; // 30 seconds buffer before actual expiry
}

// Update tokenExpiry from localStorage
function updateTokenExpiryFromStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storedExpiry = localStorage.getItem('landson_token_expiry');
    if (storedExpiry) {
      const parsedExpiry = parseInt(storedExpiry, 10);
      // Make sure we only set valid non-NaN values
      if (!isNaN(parsedExpiry) && parsedExpiry > 0) {
        tokenExpiry = parsedExpiry;
      } else {
        // If stored value is invalid, set a new expiry and store it
        console.warn('Stored token expiry was invalid (NaN or <= 0), setting new expiry');
        tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
        localStorage.setItem('landson_token_expiry', tokenExpiry.toString());
      }
    } else {
      // If no stored expiry, try to extract from token
      const accessToken = localStorage.getItem('landson_access_token');
      if (accessToken) {
        try {
          // Extract expiry from token if possible, or use default (10 mins)
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          if (payload.exp) {
            tokenExpiry = payload.exp * 1000; // Convert to milliseconds
          } else {
            tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
          }
          // Store the expiry time - ensure it's a valid number
          if (!isNaN(tokenExpiry) && tokenExpiry > 0) {
            localStorage.setItem('landson_token_expiry', tokenExpiry.toString());
          } else {
            // Set fallback if calculated value is invalid
            tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
            localStorage.setItem('landson_token_expiry', tokenExpiry.toString());
          }
        } catch (e) {
          tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
          localStorage.setItem('landson_token_expiry', tokenExpiry.toString());
        }
      }
    }
  } catch (e) {
    console.error('Error reading token expiry from storage:', e);
    // Set a valid fallback
    tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
  }
}

/**
 * A utility function for making API requests
 * @param endpoint The API endpoint (without base URL)
 * @param options Request options
 * @returns Response data
 */
export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    includeAuth = true
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  
  // If we need auth and token is expired, try refreshing first
  if (includeAuth && isTokenExpired() && endpoint !== '/auth/refresh-token') {
    try {
      console.log('Token expired, refreshing before request');
      const refreshSuccess = await refreshToken();
      if (!refreshSuccess) {
        throw {
          status: 401,
          message: 'Session expired. Please log in again.',
          errors: { auth: ['Session expired'] }
        };
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw {
        status: 401,
        message: 'Authentication failed. Please log in again.',
        errors: { auth: ['Authentication failed'] }
      };
    }
  }
  
  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  };

  // Add authentication token if required
  if (includeAuth) {
    try {
      const accessToken = localStorage.getItem('landson_access_token');
      if (accessToken) {
        requestHeaders['Authorization'] = `Bearer ${accessToken}`;
      } else if (endpoint !== '/auth/refresh-token') {
        // If we need auth but don't have a token (and we're not trying to refresh)
        throw {
          status: 401,
          message: 'Authentication required',
          errors: { auth: ['Authentication required'] }
        };
      }
    } catch (error) {
      console.warn('Could not access localStorage for auth token');
    }
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: 'include'
  };

  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    // Make the request
    const response = await fetch(url, requestOptions);

    // Handle response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle token expired error
      if (response.status === 401 && includeAuth && endpoint !== '/auth/refresh-token') {
        try {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            // Retry original request with new token
            return apiRequest<T>(endpoint, options);
          } else {
            // If refresh failed, throw a more specific error
            throw {
              status: 401,
              message: 'Session expired. Please log in again.',
              errors: { auth: ['Session expired'] }
            };
          }
        } catch (refreshError) {
          // If refresh failed, throw the original error
          console.error('Token refresh failed:', refreshError);
          throw {
            status: 401,
            message: 'Authentication failed. Please log in again.',
            errors: errorData.errors || { auth: ['Authentication failed'] }
          };
        }
      }

      throw {
        status: response.status,
        message: errorData.message || response.statusText,
        errors: errorData.errors
      };
    }

    // Return successful response
    if (response.status === 204) {
      return {} as T; // No content
    }
    
    return response.json();
  } catch (error: any) {
    // If it's already an API error with status, just rethrow
    if (error.status) {
      throw error;
    }
    
    // Handle network errors
    console.error('API request failed:', error);
    throw {
      status: 0,
      message: 'Network error: Could not connect to server',
      errors: { network: ['Connection failed'] }
    };
  }
}

/**
 * Refresh the access token using the refresh token
 */
export async function refreshToken(): Promise<boolean> {
  try {
    const refreshToken = localStorage.getItem('landson_refresh_token');
    if (!refreshToken) {
      // No refresh token, need to login again
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    // Save new tokens
    localStorage.setItem('landson_access_token', data.accessToken);
    
    // Update token expiry time
    const expiresInMs = typeof data.expiresIn === 'number' && !isNaN(data.expiresIn) && data.expiresIn > 0 
      ? data.expiresIn * 1000 
      : TOKEN_REFRESH_INTERVAL; // Default to 10 minutes
    tokenExpiry = Date.now() + expiresInMs;
    
    // Store expiry in localStorage for persistence
    localStorage.setItem('landson_token_expiry', tokenExpiry.toString());
    
    console.log('Token refreshed, new expiry:', new Date(tokenExpiry).toISOString());
    
    return true;
  } catch (error) {
    // Clear expired tokens
    localStorage.removeItem('landson_access_token');
    localStorage.removeItem('landson_refresh_token');
    localStorage.removeItem('landson_token_expiry');
    
    // Signal failure
    return false;
  }
}

/**
 * Setup a timer to refresh the token periodically
 */
export function setupTokenRefresh(): void {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Clear any existing interval
  const existingInterval = window.__tokenRefreshInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }
  
  // Get current token expiry from localStorage
  updateTokenExpiryFromStorage();
  
  // If token expiry is not set but we have an access token, 
  // set a default expiry time (10 minutes from now)
  if ((!tokenExpiry || isNaN(tokenExpiry) || tokenExpiry <= Date.now()) && localStorage.getItem('landson_access_token')) {
    tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
    localStorage.setItem('landson_token_expiry', tokenExpiry.toString());
    console.log('Token expiry not found or expired, setting default:', new Date(tokenExpiry).toISOString());
  }

  // Set up periodic token refresh
  window.__tokenRefreshInterval = setInterval(async () => {
    if (localStorage.getItem('landson_access_token')) {
      if (isTokenExpired()) {
        console.log('Token refresh interval triggered');
        try {
          await refreshToken();
        } catch (e) {
          console.error('Scheduled token refresh failed:', e);
        }
      }
    } else {
      // No token, clear the interval
      clearInterval(window.__tokenRefreshInterval);
      delete window.__tokenRefreshInterval;
    }
  }, 60000); // Check every minute
}

// Augment the window interface
declare global {
  interface Window {
    __tokenRefreshInterval?: NodeJS.Timeout;
  }
}

// Export tokenExpiry for UI components
export function getTokenExpiry(): number {
  return tokenExpiry;
}

// Function to calculate time remaining until token refresh
export function getTokenTimeRemaining(): { minutes: number; seconds: number } {
  // Ensure the token expiry is up to date
  updateTokenExpiryFromStorage();
  
  const now = Date.now();
  const timeRemaining = Math.max(0, tokenExpiry - now);
  
  // If tokenExpiry is not set correctly (0 or NaN), return default values
  if (!tokenExpiry || isNaN(timeRemaining)) {
    return { minutes: 10, seconds: 0 }; // Default to 10 minutes
  }
  
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  
  return { minutes, seconds };
} 