/**
 * @component ChecklistItemForm
 * @summary Form component for creating checklist items
 * @domain checklistItem
 * @type domain-component
 * @category form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/core/components/Button';
import type { ChecklistItemFormProps, ChecklistItemFormData } from './types';

const checklistItemSchema = z.object({
  nome: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  observacao: z.string().max(200, 'A observação deve ter no máximo 200 caracteres').optional(),
});

export const ChecklistItemForm = ({
  checklistId,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ChecklistItemFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChecklistItemFormData>({
    resolver: zodResolver(checklistItemSchema),
    defaultValues: {
      nome: '',
      observacao: '',
    },
  });

  const handleFormSubmit = async (data: ChecklistItemFormData) => {
    await onSubmit({
      checklistId,
      nome: data.nome,
      observacao: data.observacao,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Item *
        </label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Ex: Protetor solar"
        />
        {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="observacao" className="block text-sm font-medium text-gray-700 mb-2">
          Observação (opcional)
        </label>
        <textarea
          id="observacao"
          {...register('observacao')}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Adicione detalhes sobre o item"
        />
        {errors.observacao && (
          <p className="mt-1 text-sm text-red-600">{errors.observacao.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
          Adicionar Item
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
