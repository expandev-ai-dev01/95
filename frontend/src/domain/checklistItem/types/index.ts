/**
 * @types ChecklistItem
 * @summary Type definitions for checklist item domain
 * @domain checklistItem
 */

export type ItemStatus = 'pendente' | 'verificado';

export interface ChecklistItem {
  id: string;
  checklistId: string;
  nome: string;
  observacao?: string;
  status: ItemStatus;
  dataCriacao: string;
  dataAtualizacao?: string;
}

export interface CreateChecklistItemDto {
  checklistId: string;
  nome: string;
  observacao?: string;
}

export interface UpdateChecklistItemDto {
  nome: string;
  observacao?: string;
}

export interface ChecklistItemListParams {
  checklistId: string;
  status?: ItemStatus | 'Todos';
  busca?: string;
}

export interface ToggleItemStatusDto {
  itemId: string;
}

export const ITEM_STATUSES: ItemStatus[] = ['pendente', 'verificado'];
