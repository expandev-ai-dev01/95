/**
 * @hook useChecklistUpdate
 * @summary Hook for updating checklist
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistService } from '../../services/checklistService';
import type { UseChecklistUpdateReturn } from './types';

export const useChecklistUpdate = (): UseChecklistUpdateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => checklistService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    update: (id, data) => mutateAsync({ id, data }),
    isUpdating: isPending,
    error: error as Error | null,
  };
};
