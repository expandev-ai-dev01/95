/**
 * @service checklistService
 * @summary Checklist API service
 * @domain checklist
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type {
  Checklist,
  CreateChecklistDto,
  UpdateChecklistDto,
  ChecklistListParams,
} from '../types';

export const checklistService = {
  /**
   * @endpoint GET /api/v1/internal/checklist
   * @summary Fetches list of checklists with optional filters
   */
  async list(params?: ChecklistListParams): Promise<Checklist[]> {
    const response = await authenticatedClient.get('/checklist', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/checklist/:id
   * @summary Fetches single checklist by ID
   */
  async getById(id: string): Promise<Checklist> {
    const response = await authenticatedClient.get(`/checklist/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/checklist
   * @summary Creates new checklist
   */
  async create(data: CreateChecklistDto): Promise<Checklist> {
    const response = await authenticatedClient.post('/checklist', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/checklist/:id
   * @summary Updates existing checklist
   */
  async update(id: string, data: UpdateChecklistDto): Promise<Checklist> {
    const response = await authenticatedClient.put(`/checklist/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/checklist/:id
   * @summary Deletes checklist
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/checklist/${id}`);
  },
};
