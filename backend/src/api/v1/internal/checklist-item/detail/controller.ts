/**
 * @summary
 * Checklist item detail API controller
 *
 * @module api/v1/internal/checklist-item/detail/controller
 *
 * @description
 * Handles HTTP requests for specific item operations (get, update, delete).
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  checklistItemGet,
  checklistItemUpdate,
  checklistItemDelete,
} from '@/services/checklistItem';
import { zItemName, zObservation, zUUID } from '@/utils/zodValidation';

const paramsSchema = z.object({
  id: zUUID,
});

const updateBodySchema = z.object({
  nome: zItemName,
  observacao: zObservation,
});

/**
 * @api {get} /api/v1/internal/checklist-item/:id Get Item
 * @apiName GetChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific item by ID
 *
 * @apiParam {String} id Item UUID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Item data
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid UUID
 * @apiError {String} NotFoundError Item not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    const data = await checklistItemGet(validated.id);

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

/**
 * @api {put} /api/v1/internal/checklist-item/:id Update Item
 * @apiName UpdateChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing item
 *
 * @apiParam {String} id Item UUID
 * @apiParam {String} nome Updated item name (2-100 characters)
 * @apiParam {String} [observacao] Updated observation (max 200 characters)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Updated item
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFoundError Item not found
 * @apiError {String} ServerError Internal server error
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = updateBodySchema.parse(req.body);

    const data = await checklistItemUpdate({
      id: validatedParams.id,
      nome: validatedBody.nome,
      observacao: validatedBody.observacao,
    });

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

/**
 * @api {delete} /api/v1/internal/checklist-item/:id Delete Item
 * @apiName DeleteChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes an item
 *
 * @apiParam {String} id Item UUID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Empty object
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid UUID
 * @apiError {String} NotFoundError Item not found
 * @apiError {String} ServerError Internal server error
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    await checklistItemDelete(validated.id);

    res.json(successResponse({}));
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
