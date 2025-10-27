/**
 * @page ChecklistEditPage
 * @summary Edit checklist page
 * @domain checklist
 * @type form-page
 * @category checklist-management
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChecklistForm } from '@/domain/checklist/components/ChecklistForm';
import { useChecklistUpdate } from '@/domain/checklist/hooks/useChecklistUpdate';
import { checklistService } from '@/domain/checklist/services/checklistService';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { Checklist, UpdateChecklistDto } from '@/domain/checklist/types';

export const ChecklistEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { update, isUpdating } = useChecklistUpdate();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (data: UpdateChecklistDto) => {
    if (!id) return;
    try {
      await update(id, data);
      navigate('/checklists');
    } catch (error: unknown) {
      alert('Erro ao atualizar checklist');
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
        <button
          onClick={() => navigate('/checklists')}
          className="text-primary-600 hover:text-primary-700"
        >
          Voltar para lista
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Checklist</h1>
        <p className="text-gray-600">Atualize as informações do seu checklist</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ChecklistForm
          initialData={{
            nome: checklist.nome,
            tipoViagem: checklist.tipoViagem,
            descricao: checklist.descricao,
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/checklists')}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
};

export default ChecklistEditPage;
