/**
 * @page ChecklistNewPage
 * @summary Create new checklist page
 * @domain checklist
 * @type form-page
 * @category checklist-management
 */

import { useNavigate } from 'react-router-dom';
import { ChecklistForm } from '@/domain/checklist/components/ChecklistForm';
import { useChecklistCreate } from '@/domain/checklist/hooks/useChecklistCreate';
import type { CreateChecklistDto } from '@/domain/checklist/types';

export const ChecklistNewPage = () => {
  const navigate = useNavigate();
  const { create, isCreating } = useChecklistCreate();

  const handleSubmit = async (data: CreateChecklistDto) => {
    try {
      await create(data);
      navigate('/checklists');
    } catch (error: unknown) {
      alert('Erro ao criar checklist');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Checklist</h1>
        <p className="text-gray-600">
          Preencha as informações abaixo para criar seu checklist personalizado
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ChecklistForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/checklists')}
          isSubmitting={isCreating}
        />
      </div>
    </div>
  );
};

export default ChecklistNewPage;
