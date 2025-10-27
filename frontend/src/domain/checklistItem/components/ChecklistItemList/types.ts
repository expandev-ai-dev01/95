/**
 * @types ChecklistItemList
 * @summary Type definitions for ChecklistItemList component
 */

import type { ChecklistItem, ItemStatus } from '../../types';

export interface ChecklistItemListProps {
  checklistId: string;
  filterStatus?: ItemStatus | 'Todos';
  searchText?: string;
}
