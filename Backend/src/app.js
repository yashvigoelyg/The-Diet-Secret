import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/index.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allows requests from Vite (http://localhost:3000) or any port
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Serve uploaded medical reports statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root Route & Documentation
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    platform: 'The Diet Secrets - Clinical Nutrition & Wellness API',
    version: '1.0.0',
    documentation: '/api',
    endpoints: {
      health: 'GET /health',
      plans: 'GET /api/plans',
      dietitians: 'GET /api/dietitians',
      bookings: 'POST /api/bookings, GET /api/bookings',
      checkout: 'POST /api/checkout/create-order, POST /api/checkout/verify-payment',
      dashboard: 'GET /api/dashboard/overview, POST /api/dashboard/log-water, POST /api/dashboard/log-meal',
      foods: 'GET /api/foods (Indian Food Compendium)',
      tools: 'POST /api/tools/bmi-calculate (Asian-Indian Cutoffs)',
      intake: 'POST /api/intake'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.method} ${req.originalUrl}' not found.`
  });
});

// Central Error Handler
app.use(errorHandler);

export default app;

