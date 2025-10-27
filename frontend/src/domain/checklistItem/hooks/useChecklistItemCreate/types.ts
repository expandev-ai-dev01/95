/**
 * @types useChecklistItemCreate
 * @summary Type definitions for useChecklistItemCreate hook
 */

import type { ChecklistItem, CreateChecklistItemDto } from '../../types';

export interface UseChecklistItemCreateReturn {
  create: (data: CreateChecklistItemDto) => Promise<ChecklistItem>;
  isCreating: boolean;
  error: Error | null;
}
