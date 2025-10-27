/**
 * @service checklistItemService
 * @summary Checklist item API service
 * @domain checklistItem
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type {
  ChecklistItem,
  CreateChecklistItemDto,
  UpdateChecklistItemDto,
  ChecklistItemListParams,
  ToggleItemStatusDto,
} from '../types';

export const checklistItemService = {
  /**
   * @endpoint GET /api/v1/internal/checklist-item
   * @summary Fetches list of items with optional filters
   */
  async list(params: ChecklistItemListParams): Promise<ChecklistItem[]> {
    const response = await authenticatedClient.get('/checklist-item', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/checklist-item/:id
   * @summary Fetches single item by ID
   */
  async getById(id: string): Promise<ChecklistItem> {
    const response = await authenticatedClient.get(`/checklist-item/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/checklist-item
   * @summary Creates new item
   */
  async create(data: CreateChecklistItemDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.post('/checklist-item', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/checklist-item/:id
   * @summary Updates existing item
   */
  async update(id: string, data: UpdateChecklistItemDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.put(`/checklist-item/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/checklist-item/:id
   * @summary Deletes item
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/checklist-item/${id}`);
  },

  /**
   * @endpoint POST /api/v1/internal/checklist-item/toggle-status
   * @summary Toggles item verification status
   */
  async toggleStatus(data: ToggleItemStatusDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.post('/checklist-item/toggle-status', data);
    return response.data.data;
  },
};
