import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';
import { isDevelopment } from '../config/environment';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<ApiError>,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: error.message,
    stack: isDevelopment ? error.stack : undefined,
    url: req.url,
    method: req.method,
    body: req.body,
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';
  let details: string | undefined;

  // Handle specific error types
  if (error.message.includes('User ID')) {
    statusCode = 400;
    message = 'Invalid user ID';
    details = error.message;
  } else if (error.message.includes('Token')) {
    statusCode = 500;
    message = 'Failed to generate token';
    details = isDevelopment ? error.message : undefined;
  }

  res.status(statusCode).json({
    message,
    details: isDevelopment ? details || error.message : details,
    code: 'INTERNAL_ERROR',
  });
};

/**
 * 404 handler for unmatched routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response<ApiError>
): void => {
  res.status(404).json({
    message: `Route ${req.method} ${req.url} not found`,
    code: 'ROUTE_NOT_FOUND',
  });
};
