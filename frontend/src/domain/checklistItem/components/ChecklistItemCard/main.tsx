/**
 * @component ChecklistItemCard
 * @summary Card component for displaying checklist item with toggle
 * @domain checklistItem
 * @type domain-component
 * @category display
 */

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ChecklistItemCardProps } from './types';

export const ChecklistItemCard = ({ item, onToggle, isToggling }: ChecklistItemCardProps) => {
  const isVerified = item.status === 'verificado';

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${
        isVerified ? 'border-green-300 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(item.id)}
          disabled={isToggling}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all ${
            isVerified
              ? 'bg-green-500 border-green-500'
              : 'bg-white border-gray-300 hover:border-primary-500'
          } ${
            isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } flex items-center justify-center`}
          aria-label={isVerified ? 'Desmarcar item' : 'Marcar item como verificado'}
        >
          {isVerified && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>

        <div className="flex-1">
          <h3
            className={`font-medium ${isVerified ? 'text-gray-500 line-through' : 'text-gray-900'}`}
          >
            {item.nome}
          </h3>
          {item.observacao && <p className="text-sm text-gray-600 mt-1">{item.observacao}</p>}
          <p className="text-xs text-gray-500 mt-2">
            {isVerified ? 'Verificado' : 'Pendente'} •{' '}
            {format(new Date(item.dataCriacao), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
      </div>
    </div>
  );
};
