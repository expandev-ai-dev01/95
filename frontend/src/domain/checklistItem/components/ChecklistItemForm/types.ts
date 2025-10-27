/**
 * @types ChecklistItemForm
 * @summary Type definitions for ChecklistItemForm component
 */

import type { CreateChecklistItemDto } from '../../types';

export interface ChecklistItemFormProps {
  checklistId: string;
  onSubmit: (data: CreateChecklistItemDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ChecklistItemFormData {
  nome: string;
  observacao?: string;
}
