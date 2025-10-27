/**
 * @hook useChecklistItemToggle
 * @summary Hook for toggling item verification status
 * @domain checklistItem
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistItemService } from '../../services/checklistItemService';
import type { UseChecklistItemToggleReturn } from './types';

export const useChecklistItemToggle = (): UseChecklistItemToggleReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (itemId: string) => checklistItemService.toggleStatus({ itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist-items'] });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    toggleStatus: mutateAsync,
    isToggling: isPending,
    error: error as Error | null,
  };
};
