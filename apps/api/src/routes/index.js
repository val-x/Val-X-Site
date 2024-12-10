import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Add more routes here
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

export default router; 