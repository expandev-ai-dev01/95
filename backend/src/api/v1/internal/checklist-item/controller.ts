/**
 * @summary
 * Checklist item API controller
 *
 * @module api/v1/internal/checklist-item/controller
 *
 * @description
 * Handles HTTP requests for checklist item operations (list, create).
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { checklistItemCreate, checklistItemList } from '@/services/checklistItem';
import { zItemName, zObservation, zUUID } from '@/utils/zodValidation';
import { ItemStatus, ITEM_STATUSES } from '@/constants/itemStatus';

const createBodySchema = z.object({
  checklistId: zUUID,
  nome: zItemName,
  observacao: zObservation.optional(),
});

const listQuerySchema = z.object({
  checklistId: zUUID,
  status: z.enum(['Todos', ...ITEM_STATUSES] as [string, ...string[]]).optional(),
  busca: z.string().optional(),
});

/**
 * @api {get} /api/v1/internal/checklist-item List Items
 * @apiName ListChecklistItems
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all items for a checklist with optional filtering
 *
 * @apiParam {String} checklistId Checklist UUID
 * @apiParam {String} [status] Status filter (Todos, pendente, verificado)
 * @apiParam {String} [busca] Search text for name/observation
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Array} data Array of items
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = listQuerySchema.parse(req.query);

    const data = await checklistItemList(
      validated.checklistId,
      validated.status as ItemStatus | 'Todos',
      validated.busca
    );

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {post} /api/v1/internal/checklist-item Create Item
 * @apiName CreateChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new checklist item
 *
 * @apiParam {String} checklistId Checklist UUID
 * @apiParam {String} nome Item name (2-100 characters)
 * @apiParam {String} [observacao] Optional observation (max 200 characters)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Created item
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} LimitError Maximum items reached (50)
 * @apiError {String} ServerError Internal server error
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = createBodySchema.parse(req.body);

    const data = await checklistItemCreate({
      checklistId: validated.checklistId,
      nome: validated.nome,
      observacao: validated.observacao || null,
    });

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message.includes('limite de 50 itens')) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
