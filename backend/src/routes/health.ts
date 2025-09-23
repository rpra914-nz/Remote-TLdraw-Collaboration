import { Router, Request, Response } from 'express';
import { HealthResponse } from '../types';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get(
  '/',
  (req: Request, res: Response<HealthResponse>): void => {
    const uptime = process.uptime();
    
    res.status(200).json({
      status: 'ok',
      service: 'stream-token-service',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
    });
  }
);

export { router as healthRouter };
