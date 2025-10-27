/**
 * @types useChecklistDelete
 * @summary Type definitions for useChecklistDelete hook
 */

export interface UseChecklistDeleteReturn {
  deleteChecklist: (id: string) => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}
