/**
 * @hook useChecklistItemList
 * @summary Hook for fetching checklist items
 * @domain checklistItem
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { checklistItemService } from '../../services/checklistItemService';
import type { UseChecklistItemListOptions, UseChecklistItemListReturn } from './types';

export const useChecklistItemList = (
  options: UseChecklistItemListOptions
): UseChecklistItemListReturn => {
  const { params, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['checklist-items', params],
    queryFn: () => checklistItemService.list(params),
    enabled: enabled && !!params.checklistId,
  });

  return {
    items: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
