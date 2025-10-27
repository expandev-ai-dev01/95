/**
 * @summary
 * Checklist detail API controller
 *
 * @module api/v1/internal/checklist/detail/controller
 *
 * @description
 * Handles HTTP requests for specific checklist operations (get, update, delete).
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { checklistGet, checklistUpdate, checklistDelete } from '@/services/checklist';
import { zChecklistName, zObservation, zUUID } from '@/utils/zodValidation';
import { TripType, TRIP_TYPES } from '@/constants/tripType';

const paramsSchema = z.object({
  id: zUUID,
});

const updateBodySchema = z.object({
  nome: zChecklistName,
  tipoViagem: z.enum(TRIP_TYPES as [string, ...string[]]),
  descricao: zObservation,
});

/**
 * @api {get} /api/v1/internal/checklist/:id Get Checklist
 * @apiName GetChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific checklist by ID
 *
 * @apiParam {String} id Checklist UUID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Checklist data
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid UUID
 * @apiError {String} NotFoundError Checklist not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    const data = await checklistGet(validated.id);

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
 * @api {put} /api/v1/internal/checklist/:id Update Checklist
 * @apiName UpdateChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing checklist
 *
 * @apiParam {String} id Checklist UUID
 * @apiParam {String} nome Updated checklist name (3-50 characters)
 * @apiParam {String} tipoViagem Updated trip type
 * @apiParam {String} [descricao] Updated description (max 200 characters)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Updated checklist
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFoundError Checklist not found
 * @apiError {String} DuplicateError Name already exists
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

    const data = await checklistUpdate({
      id: validatedParams.id,
      nome: validatedBody.nome,
      tipoViagem: validatedBody.tipoViagem as TripType,
      descricao: validatedBody.descricao,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message));
    } else if (error.message.includes('já possui outro checklist')) {
      res.status(409).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /api/v1/internal/checklist/:id Delete Checklist
 * @apiName DeleteChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a checklist and all its items
 *
 * @apiParam {String} id Checklist UUID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Empty object
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid UUID
 * @apiError {String} NotFoundError Checklist not found
 * @apiError {String} ServerError Internal server error
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = paramsSchema.parse(req.params);

    await checklistDelete(validated.id);

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
