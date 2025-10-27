/**
 * @types useChecklistItemList
 * @summary Type definitions for useChecklistItemList hook
 */

import type { ChecklistItem, ChecklistItemListParams } from '../../types';

export interface UseChecklistItemListOptions {
  params: ChecklistItemListParams;
  enabled?: boolean;
}

export interface UseChecklistItemListReturn {
  items: ChecklistItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
