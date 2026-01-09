import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendVerificationEmail, verifyEmail } from './controllers/emailVerification.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'La Cura API is running',
    timestamp: new Date().toISOString()
  });
});

// Email verification routes
app.post('/api/send-verification-email', sendVerificationEmail);
app.post('/api/verify-email', verifyEmail);
app.get('/api/verify-email', verifyEmail); // Support GET for email links

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 La Cura API running on port ${PORT}`);
  console.log(`📧 Email verification endpoints ready`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
