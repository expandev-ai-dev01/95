/**
 * @page ChecklistsPage
 * @summary Checklists list page
 * @domain checklist
 * @type list-page
 * @category checklist-management
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { useChecklistList } from '@/domain/checklist/hooks/useChecklistList';
import { useChecklistDelete } from '@/domain/checklist/hooks/useChecklistDelete';
import { ChecklistCard } from '@/domain/checklist/components/ChecklistCard';
import { TRIP_TYPES, SORT_ORDERS } from '@/domain/checklist/types';
import type { TripType, SortOrder } from '@/domain/checklist/types';

export const ChecklistsPage = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<TripType | 'Todos'>('Todos');
  const [sortOrder, setSortOrder] = useState<SortOrder>('Mais recentes');

  const { checklists, isLoading, error, refetch } = useChecklistList({
    filters: {
      tipoViagem: filterType,
      ordenacao: sortOrder,
    },
  });

  const { deleteChecklist, isDeleting } = useChecklistDelete();

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este checklist?')) {
      try {
        await deleteChecklist(id);
        refetch();
      } catch (error: unknown) {
        alert('Erro ao excluir checklist');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Erro ao carregar checklists</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meus Checklists</h1>
        <Button variant="primary" onClick={() => navigate('/checklists/new')}>
          Criar Novo Checklist
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por tipo</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TripType | 'Todos')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            >
              <option value="Todos">Todos</option>
              {TRIP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            >
              {SORT_ORDERS.map((order) => (
                <option key={order} value={order}>
                  {order}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {checklists.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600 mb-4">
            Você ainda não possui checklists. Crie seu primeiro checklist agora!
          </p>
          <Button variant="primary" onClick={() => navigate('/checklists/new')}>
            Criar Primeiro Checklist
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklists.map((checklist) => (
            <ChecklistCard
              key={checklist.id}
              checklist={checklist}
              onEdit={(id) => navigate(`/checklists/${id}/edit`)}
              onDelete={handleDelete}
              onClick={(id) => navigate(`/checklists/${id}`)}
            />
          ))}
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-700">Excluindo checklist...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistsPage;
