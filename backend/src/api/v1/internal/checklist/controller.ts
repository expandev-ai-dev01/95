/**
 * @summary
 * Checklist API controller
 *
 * @module api/v1/internal/checklist/controller
 *
 * @description
 * Handles HTTP requests for checklist operations (list, create).
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { checklistCreate, checklistList } from '@/services/checklist';
import { zChecklistName, zObservation } from '@/utils/zodValidation';
import { TripType, TRIP_TYPES } from '@/constants/tripType';

const createBodySchema = z.object({
  nome: zChecklistName,
  tipoViagem: z.enum(TRIP_TYPES as [string, ...string[]]),
  descricao: zObservation,
});

const listQuerySchema = z.object({
  tipoViagem: z.enum(['Todos', ...TRIP_TYPES] as [string, ...string[]]).optional(),
  ordenacao: z
    .enum(['Mais recentes', 'Mais antigos', 'Alfabética (A-Z)', 'Alfabética (Z-A)'])
    .optional(),
});

/**
 * @api {get} /api/v1/internal/checklist List Checklists
 * @apiName ListChecklists
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all checklists with optional filtering and sorting
 *
 * @apiParam {String} [tipoViagem] Trip type filter (Todos, Praia, Negócios, etc.)
 * @apiParam {String} [ordenacao] Sort order (Mais recentes, Mais antigos, Alfabética (A-Z), Alfabética (Z-A))
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Array} data Array of checklists
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = listQuerySchema.parse(req.query);

    const data = await checklistList(
      validated.tipoViagem as TripType | 'Todos',
      validated.ordenacao
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
 * @api {post} /api/v1/internal/checklist Create Checklist
 * @apiName CreateChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new checklist
 *
 * @apiParam {String} nome Checklist name (3-50 characters)
 * @apiParam {String} tipoViagem Trip type (Praia, Negócios, Internacional, etc.)
 * @apiParam {String} [descricao] Optional description (max 200 characters)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Created checklist
 * @apiSuccess {Object} metadata Response metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} DuplicateError Checklist name already exists
 * @apiError {String} ServerError Internal server error
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validated = createBodySchema.parse(req.body);

    const data = await checklistCreate({
      nome: validated.nome,
      tipoViagem: validated.tipoViagem as TripType,
      descricao: validated.descricao,
    });

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else if (error.message.includes('já possui um checklist')) {
      res.status(409).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
