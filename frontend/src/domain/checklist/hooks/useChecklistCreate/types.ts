/**
 * @types useChecklistCreate
 * @summary Type definitions for useChecklistCreate hook
 */

import type { Checklist, CreateChecklistDto } from '../../types';

export interface UseChecklistCreateReturn {
  create: (data: CreateChecklistDto) => Promise<Checklist>;
  isCreating: boolean;
  error: Error | null;
}
