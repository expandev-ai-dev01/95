/**
 * @page ChecklistDetailPage
 * @summary Checklist detail page with items and progress
 * @domain checklist
 * @type detail-page
 * @category checklist-management
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { checklistService } from '@/domain/checklist/services/checklistService';
import { ChecklistItemList } from '@/domain/checklistItem/components/ChecklistItemList';
import { ChecklistProgressBar } from '@/domain/checklistItem/components/ChecklistProgressBar';
import { ChecklistItemForm } from '@/domain/checklistItem/components/ChecklistItemForm';
import { useChecklistItemCreate } from '@/domain/checklistItem/hooks/useChecklistItemCreate';
import { ITEM_STATUSES } from '@/domain/checklistItem/types';
import type { Checklist } from '@/domain/checklist/types';
import type { ItemStatus, CreateChecklistItemDto } from '@/domain/checklistItem/types';

export const ChecklistDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ItemStatus | 'Todos'>('Todos');
  const [searchText, setSearchText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { create, isCreating } = useChecklistItemCreate();

  useEffect(() => {
    const loadChecklist = async () => {
      if (!id) return;
      try {
        const data = await checklistService.getById(id);
        setChecklist(data);
      } catch (error: unknown) {
        setError('Erro ao carregar checklist');
      } finally {
        setIsLoading(false);
      }
    };

    loadChecklist();
  }, [id]);

  const handleRefresh = async () => {
    if (!id) return;
    try {
      const data = await checklistService.getById(id);
      setChecklist(data);
    } catch (error: unknown) {
      alert('Erro ao atualizar checklist');
    }
  };

  const handleAddItem = async (data: CreateChecklistItemDto) => {
    try {
      await create(data);
      setShowAddForm(false);
      await handleRefresh();
    } catch (error: unknown) {
      alert('Erro ao adicionar item');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !checklist) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Checklist não encontrado'}</p>
        <Button onClick={() => navigate('/checklists')}>Voltar para lista</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{checklist.nome}</h1>
          <p className="text-gray-600">{checklist.tipoViagem}</p>
          {checklist.descricao && <p className="text-gray-600 mt-2">{checklist.descricao}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/checklists')}>
            Voltar
          </Button>
          <Button variant="ghost" onClick={() => navigate(`/checklists/${id}/edit`)}>
            Editar
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <ChecklistProgressBar
          totalItems={checklist.totalItens}
          verifiedItems={checklist.itensVerificados}
        />
      </div>

      {showAddForm ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Adicionar Novo Item</h2>
          <ChecklistItemForm
            checklistId={id!}
            onSubmit={handleAddItem}
            onCancel={() => setShowAddForm(false)}
            isSubmitting={isCreating}
          />
        </div>
      ) : (
        <div className="mb-6">
          <Button variant="primary" fullWidth onClick={() => setShowAddForm(true)}>
            + Adicionar Item
          </Button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ItemStatus | 'Todos')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            >
              <option value="Todos">Todos</option>
              {ITEM_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'pendente' ? 'Pendentes' : 'Verificados'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar item</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Digite o nome do item..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Itens do Checklist</h2>
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            Atualizar
          </Button>
        </div>
        <ChecklistItemList checklistId={id!} filterStatus={filterStatus} searchText={searchText} />
      </div>
    </div>
  );
};

export default ChecklistDetailPage;
