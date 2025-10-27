/**
 * @component ChecklistItemList
 * @summary List component for displaying checklist items with filtering
 * @domain checklistItem
 * @type domain-component
 * @category display
 */

import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { useChecklistItemList } from '../../hooks/useChecklistItemList';
import { useChecklistItemToggle } from '../../hooks/useChecklistItemToggle';
import { ChecklistItemCard } from '../ChecklistItemCard';
import type { ChecklistItemListProps } from './types';

export const ChecklistItemList = ({
  checklistId,
  filterStatus = 'Todos',
  searchText,
}: ChecklistItemListProps) => {
  const { items, isLoading, error, refetch } = useChecklistItemList({
    params: {
      checklistId,
      status: filterStatus,
      busca: searchText,
    },
  });

  const { toggleStatus, isToggling } = useChecklistItemToggle();

  const handleToggle = async (itemId: string) => {
    try {
      await toggleStatus(itemId);
      refetch();
    } catch (error: unknown) {
      alert('Erro ao atualizar status do item');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Erro ao carregar itens</p>
        <button onClick={() => refetch()} className="text-primary-600 hover:text-primary-700">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">
          {searchText || filterStatus !== 'Todos'
            ? 'Nenhum item encontrado com os filtros aplicados'
            : 'Nenhum item adicionado ainda'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ChecklistItemCard
          key={item.id}
          item={item}
          onToggle={handleToggle}
          isToggling={isToggling}
        />
      ))}
    </div>
  );
};
