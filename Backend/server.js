import app from './src/app.js';
import { config } from './src/config/index.js';

const server = app.listen(config.port, () => {
  console.log('====================================================');
  console.log(`🌿 The Diet Secrets Backend Server Running!`);
  console.log(`📡 URL: http://localhost:${config.port}`);
  console.log(`🩺 Health: http://localhost:${config.port}/health`);
  console.log(`📋 API Docs: http://localhost:${config.port}/api`);
  console.log(`⚡ Environment: ${config.nodeEnv}`);
  console.log('====================================================');
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received. Shutting down...');
  server.close(() => {
    console.log('Server terminated.');
    process.exit(0);
  });
});

