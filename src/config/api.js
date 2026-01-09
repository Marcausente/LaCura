/**
 * API Configuration
 * Automatically detects environment (Netlify vs IONOS) and configures endpoints
 */

// Detect if we're running on Netlify
const isNetlify = typeof window !== 'undefined' && 
  (window.location.hostname.includes('netlify') || 
   import.meta.env.VITE_DEPLOY_PLATFORM === 'netlify');

// Get API base URL based on environment
const getApiBaseUrl = () => {
  // 1. Check for explicit API URL in environment variables
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. If on Netlify, use Netlify Functions
  if (isNetlify) {
    return '/.netlify/functions';
  }

  // 3. For IONOS or other hosting, use backend API
  // In production, this should be your IONOS backend URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_BACKEND_URL || '/api';
  }

  // 4. Local development - assume backend runs on port 3000
  return 'http://localhost:3000/api';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  sendVerificationEmail: isNetlify 
    ? `${API_BASE_URL}/send-verification-email`
    : `${API_BASE_URL}/send-verification-email`,
  
  verifyEmail: isNetlify
    ? `${API_BASE_URL}/verify-email`
    : `${API_BASE_URL}/verify-email`,
  
  health: isNetlify ? null : `${API_BASE_URL}/health`
};

// Export utility to check platform
export const PLATFORM = {
  isNetlify,
  isIONOS: !isNetlify && import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV
};

// Debug info (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_BASE_URL,
    platform: isNetlify ? 'Netlify' : 'IONOS/Custom',
    endpoints: API_ENDPOINTS
  });
}
