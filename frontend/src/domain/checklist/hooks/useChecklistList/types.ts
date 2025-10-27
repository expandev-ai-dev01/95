/**
 * @types useChecklistList
 * @summary Type definitions for useChecklistList hook
 */

import type { Checklist, ChecklistListParams } from '../../types';

export interface UseChecklistListOptions {
  filters?: ChecklistListParams;
  enabled?: boolean;
}

export interface UseChecklistListReturn {
  checklists: Checklist[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
