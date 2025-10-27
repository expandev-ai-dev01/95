/**
 * @summary
 * Request validation middleware
 *
 * @module middleware/validationMiddleware
 *
 * @description
 * Validates request data against Zod schemas, ensuring data integrity before processing.
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '@/utils/response';

/**
 * @summary
 * Creates validation middleware for request data
 *
 * @function validationMiddleware
 * @module middleware
 *
 * @param {ZodSchema} schema - Zod validation schema
 *
 * @returns {Function} Express middleware function
 *
 * @description
 * Validates request body against provided Zod schema and returns 400 error if validation fails.
 *
 * @example
 * router.post('/endpoint', validationMiddleware(mySchema), controller);
 */
export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    }
  };
}
