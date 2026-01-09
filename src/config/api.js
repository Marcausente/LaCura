/**
 * API Configuration for IONOS Deployment
 * Simple configuration that points to the Express backend
 */

// Get API base URL based on environment
const getApiBaseUrl = () => {
  // 1. Production: Use environment variable or default to /api
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || '/api';
  }

  // 2. Development: Backend runs on port 3000
  return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  sendVerificationEmail: `${API_BASE_URL}/send-verification-email`,
  verifyEmail: `${API_BASE_URL}/verify-email`,
  health: `${API_BASE_URL}/health`
};

// Debug info (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_BASE_URL,
    environment: import.meta.env.MODE,
    endpoints: API_ENDPOINTS
  });
}
