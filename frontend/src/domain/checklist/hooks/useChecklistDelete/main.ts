/**
 * @hook useChecklistDelete
 * @summary Hook for deleting checklist
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistService } from '../../services/checklistService';
import type { UseChecklistDeleteReturn } from './types';

export const useChecklistDelete = (): UseChecklistDeleteReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: checklistService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    deleteChecklist: mutateAsync,
    isDeleting: isPending,
    error: error as Error | null,
  };
};
