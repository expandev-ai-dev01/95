/**
 * @types ChecklistItemCard
 * @summary Type definitions for ChecklistItemCard component
 */

import type { ChecklistItem } from '../../types';

export interface ChecklistItemCardProps {
  item: ChecklistItem;
  onToggle: (itemId: string) => void;
  isToggling: boolean;
}
