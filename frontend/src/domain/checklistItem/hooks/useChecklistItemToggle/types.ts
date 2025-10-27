/**
 * @types useChecklistItemToggle
 * @summary Type definitions for useChecklistItemToggle hook
 */

import type { ChecklistItem } from '../../types';

export interface UseChecklistItemToggleReturn {
  toggleStatus: (itemId: string) => Promise<ChecklistItem>;
  isToggling: boolean;
  error: Error | null;
}
