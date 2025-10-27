/**
 * @types ChecklistCard
 * @summary Type definitions for ChecklistCard component
 */

import type { Checklist } from '../../types';

export interface ChecklistCardProps {
  checklist: Checklist;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}
