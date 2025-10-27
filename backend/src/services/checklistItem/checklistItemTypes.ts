/**
 * @summary
 * Checklist item type definitions
 *
 * @module services/checklistItem/checklistItemTypes
 *
 * @description
 * Type definitions for checklist item entities and operations.
 */

import { ItemStatus } from '@/constants/itemStatus';

/**
 * @interface ChecklistItemEntity
 * @description Represents a checklist item entity
 *
 * @property {string} id - Unique item identifier (UUID)
 * @property {string} checklistId - Parent checklist identifier
 * @property {string} nome - Item name
 * @property {string | null} observacao - Optional observation
 * @property {number} ordem - Display order
 * @property {ItemStatus} status - Item status (pendente/verificado)
 */
export interface ChecklistItemEntity {
  id: string;
  checklistId: string;
  nome: string;
  observacao: string | null;
  ordem: number;
  status: ItemStatus;
}

/**
 * @interface ChecklistItemCreateRequest
 * @description Request parameters for creating a checklist item
 *
 * @property {string} checklistId - Parent checklist identifier
 * @property {string} nome - Item name (2-100 characters)
 * @property {string | null} observacao - Optional observation (max 200 characters)
 */
export interface ChecklistItemCreateRequest {
  checklistId: string;
  nome: string;
  observacao: string | null;
}

/**
 * @interface ChecklistItemUpdateRequest
 * @description Request parameters for updating a checklist item
 *
 * @property {string} id - Item identifier
 * @property {string} nome - Updated item name (2-100 characters)
 * @property {string | null} observacao - Updated observation (max 200 characters)
 */
export interface ChecklistItemUpdateRequest {
  id: string;
  nome: string;
  observacao: string | null;
}
