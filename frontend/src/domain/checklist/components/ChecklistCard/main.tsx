/**
 * @component ChecklistCard
 * @summary Card component for displaying checklist
 * @domain checklist
 * @type domain-component
 * @category display
 */

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/core/components/Button';
import type { ChecklistCardProps } from './types';

export const ChecklistCard = ({ checklist, onEdit, onDelete, onClick }: ChecklistCardProps) => {
  const progress =
    checklist.totalItens > 0
      ? Math.round((checklist.itensVerificados / checklist.totalItens) * 100)
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 cursor-pointer" onClick={() => onClick(checklist.id)}>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{checklist.nome}</h3>
          <p className="text-sm text-gray-500">{checklist.tipoViagem}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(checklist.id)}>
            Editar
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(checklist.id)}>
            Excluir
          </Button>
        </div>
      </div>

      {checklist.descricao && <p className="text-gray-600 mb-4 text-sm">{checklist.descricao}</p>}

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progresso</span>
          <span>
            {checklist.itensVerificados}/{checklist.totalItens} itens
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Criado em{' '}
        {format(new Date(checklist.dataCriacao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </div>
    </div>
  );
};
