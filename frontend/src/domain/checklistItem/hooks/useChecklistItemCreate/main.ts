/**
 * @hook useChecklistItemCreate
 * @summary Hook for creating checklist items
 * @domain checklistItem
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistItemService } from '../../services/checklistItemService';
import type { UseChecklistItemCreateReturn } from './types';

export const useChecklistItemCreate = (): UseChecklistItemCreateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: checklistItemService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist-items'] });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    create: mutateAsync,
    isCreating: isPending,
    error: error as Error | null,
  };
};
