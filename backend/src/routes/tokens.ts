import { Router, Request, Response } from 'express';
import { StreamService } from '../services/StreamService';
import { validateTokenRequest } from '../middleware/validation';
import { StreamTokenRequest, StreamTokenResponse, ApiError } from '../types';

const router = Router();
const streamService = new StreamService();

/**
 * POST /api/tokens
 * Generate a Stream video token for a user
 */
router.post(
  '/',
  validateTokenRequest,
  async (
    req: Request<{}, StreamTokenResponse | ApiError, StreamTokenRequest>,
    res: Response<StreamTokenResponse | ApiError>
  ): Promise<void> => {
    try {
      const { userId } = req.body;
      
      console.log(`Generating token for user: ${userId}`);
      
      const tokenResponse = streamService.createTokenResponse(userId);
      
      console.log(`Token generated successfully for user: ${tokenResponse.userId}`);
      
      res.status(200).json(tokenResponse);
    } catch (error) {
      console.error('Token generation failed:', error);
      
      const message = error instanceof Error ? error.message : 'Unknown error';
      
      res.status(400).json({
        message: 'Failed to generate token',
        details: message,
        code: 'TOKEN_GENERATION_FAILED',
      });
    }
  }
);

export { router as tokensRouter };
