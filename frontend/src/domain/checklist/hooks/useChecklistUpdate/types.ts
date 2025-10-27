/**
 * @types useChecklistUpdate
 * @summary Type definitions for useChecklistUpdate hook
 */

import type { Checklist, UpdateChecklistDto } from '../../types';

export interface UseChecklistUpdateReturn {
  update: (id: string, data: UpdateChecklistDto) => Promise<Checklist>;
  isUpdating: boolean;
  error: Error | null;
}
