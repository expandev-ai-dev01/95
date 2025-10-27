/**
 * @summary
 * 404 Not Found middleware
 *
 * @module middleware/notFoundMiddleware
 *
 * @description
 * Handles requests to undefined routes, returning a 404 error response.
 */

import { Request, Response } from 'express';
import { errorResponse } from '@/utils/response';

/**
 * @summary
 * Express 404 handler middleware
 *
 * @function notFoundMiddleware
 * @module middleware
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 *
 * @returns {void}
 *
 * @description
 * Returns 404 error for undefined routes.
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(errorResponse(`Route ${req.method} ${req.path} not found`));
}
