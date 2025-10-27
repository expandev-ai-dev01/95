/**
 * @types ChecklistForm
 * @summary Type definitions for ChecklistForm component
 */

import type { CreateChecklistDto, UpdateChecklistDto, TripType } from '../../types';

export interface ChecklistFormProps {
  initialData?: UpdateChecklistDto & { id?: string };
  onSubmit: (data: CreateChecklistDto | UpdateChecklistDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ChecklistFormData {
  nome: string;
  tipoViagem: TripType;
  descricao?: string;
}
