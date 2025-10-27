/**
 * @summary
 * Checklist item status toggle API controller
 *
 * @module api/v1/internal/checklist-item/toggle-status/controller
 *
 * @description
 * Handles HTTP requests for toggling item verification status.
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { checklistItemToggleStatus } from '@/services/checklistItem';
import { zUUID } from '@/utils/zodValidation';

const bodySchema = z.object({
  itemId: zUUID,
});

/**
 * @api {post} /api/v1/internal/checklist-item/toggle-status Toggle Item Status
 * @apiName ToggleItemStatus
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Toggles the verification status of a checklist item
 *
 * @apiParam {String} itemId Item UUID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Updated item with new status
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid UUID
 * @apiError {String} NotFoundError Item not found
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = bodySchema.parse(req.body);

    const data = await checklistItemToggleStatus(validated.itemId);

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
