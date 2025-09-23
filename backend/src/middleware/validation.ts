import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';

/**
 * Validates that userId is present in request body
 */
export const validateTokenRequest = (
  req: Request,
  res: Response<ApiError>,
  next: NextFunction
): void => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({
      message: 'userId is required in request body',
      code: 'MISSING_USER_ID',
    });
    return;
  }

  if (typeof userId !== 'string') {
    res.status(400).json({
      message: 'userId must be a string',
      code: 'INVALID_USER_ID_TYPE',
    });
    return;
  }

  if (userId.trim().length === 0) {
    res.status(400).json({
      message: 'userId cannot be empty',
      code: 'EMPTY_USER_ID',
    });
    return;
  }

  next();
};
