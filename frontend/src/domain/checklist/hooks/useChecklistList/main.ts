/**
 * @hook useChecklistList
 * @summary Hook for fetching checklist list
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { checklistService } from '../../services/checklistService';
import type { UseChecklistListOptions, UseChecklistListReturn } from './types';

export const useChecklistList = (options: UseChecklistListOptions = {}): UseChecklistListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['checklists', filters],
    queryFn: () => checklistService.list(filters),
    enabled,
  });

  return {
    checklists: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
