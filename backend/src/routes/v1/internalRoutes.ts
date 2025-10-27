/**
 * @summary
 * Internal (authenticated) API routes configuration
 *
 * @module routes/v1/internalRoutes
 *
 * @description
 * Defines authenticated API endpoints that require valid credentials.
 * All routes in this module should be protected by authentication middleware.
 */

import { Router } from 'express';
import * as checklistController from '@/api/v1/internal/checklist/controller';
import * as checklistDetailController from '@/api/v1/internal/checklist/detail/controller';
import * as checklistItemController from '@/api/v1/internal/checklist-item/controller';
import * as checklistItemDetailController from '@/api/v1/internal/checklist-item/detail/controller';
import * as checklistItemToggleStatusController from '@/api/v1/internal/checklist-item/toggle-status/controller';

const router = Router();

// Checklist routes
router.get('/checklist', checklistController.listHandler);
router.post('/checklist', checklistController.createHandler);
router.get('/checklist/:id', checklistDetailController.getHandler);
router.put('/checklist/:id', checklistDetailController.updateHandler);
router.delete('/checklist/:id', checklistDetailController.deleteHandler);

// Checklist item routes
router.get('/checklist-item', checklistItemController.listHandler);
router.post('/checklist-item', checklistItemController.createHandler);
router.get('/checklist-item/:id', checklistItemDetailController.getHandler);
router.put('/checklist-item/:id', checklistItemDetailController.updateHandler);
router.delete('/checklist-item/:id', checklistItemDetailController.deleteHandler);

// Checklist item status toggle
router.post('/checklist-item/toggle-status', checklistItemToggleStatusController.postHandler);

export default router;
