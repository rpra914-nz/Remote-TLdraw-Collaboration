import { Router } from 'express';
import { tokensRouter } from './tokens';
import { healthRouter } from './health';

const router = Router();

// Mount routes
router.use('/health', healthRouter);
router.use('/tokens', tokensRouter);

export { router as apiRoutes };
