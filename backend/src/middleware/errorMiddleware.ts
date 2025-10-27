/**
 * @summary
 * Global error handling middleware
 *
 * @module middleware/errorMiddleware
 *
 * @description
 * Catches and processes all errors in the application, providing consistent error responses.
 */

import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/response';

/**
 * @summary
 * Express error handling middleware
 *
 * @function errorMiddleware
 * @module middleware
 *
 * @param {Error} error - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {void}
 *
 * @description
 * Processes errors and sends appropriate HTTP responses with error details.
 */
export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error('Error:', {
    statusCode,
    message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json(errorResponse(message, error.details));
}
