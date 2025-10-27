/**
 * @component ChecklistProgressBar
 * @summary Progress bar component showing checklist completion
 * @domain checklistItem
 * @type domain-component
 * @category display
 */

import type { ChecklistProgressBarProps } from './types';

export const ChecklistProgressBar = ({ totalItems, verifiedItems }: ChecklistProgressBarProps) => {
  const percentage = totalItems > 0 ? Math.round((verifiedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Progresso</h3>
        <span className="text-2xl font-bold text-primary-600">{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-primary-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {verifiedItems} de {totalItems} itens verificados
        </span>
        <span>{totalItems - verifiedItems} restantes</span>
      </div>
    </div>
  );
};
