/**
 * @summary
 * Item status constants
 *
 * @module constants/itemStatus
 *
 * @description
 * Defines available status values for checklist items.
 */

export enum ItemStatus {
  Pending = 'pendente',
  Verified = 'verificado',
}

export const ITEM_STATUSES = Object.values(ItemStatus);
