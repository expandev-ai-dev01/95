/**
 * @component ChecklistForm
 * @summary Form component for creating/editing checklist
 * @domain checklist
 * @type domain-component
 * @category form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/core/components/Button';
import { TRIP_TYPES } from '../../types';
import type { ChecklistFormProps, ChecklistFormData } from './types';
import type { TripType } from '../../types';

const checklistSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  tipoViagem: z.enum(TRIP_TYPES as [TripType, ...TripType[]], {
    errorMap: () => ({ message: 'Selecione um tipo de viagem' }),
  }),
  descricao: z.string().max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
});

export const ChecklistForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ChecklistFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      nome: initialData?.nome || '',
      tipoViagem: initialData?.tipoViagem || ('' as TripType),
      descricao: initialData?.descricao || '',
    },
  });

  const handleFormSubmit = async (data: ChecklistFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Checklist *
        </label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Ex: Viagem para a praia"
        />
        {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="tipoViagem" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Viagem *
        </label>
        <select
          id="tipoViagem"
          {...register('tipoViagem')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Selecione um tipo</option>
          {TRIP_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.tipoViagem && (
          <p className="mt-1 text-sm text-red-600">{errors.tipoViagem.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição (opcional)
        </label>
        <textarea
          id="descricao"
          {...register('descricao')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Adicione detalhes sobre o checklist"
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
          {initialData ? 'Atualizar' : 'Criar'} Checklist
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
