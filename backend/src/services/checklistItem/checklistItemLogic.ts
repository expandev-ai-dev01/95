/**
 * @summary
 * Checklist item business logic
 *
 * @module services/checklistItem/checklistItemLogic
 *
 * @description
 * Contains business logic for checklist item operations using in-memory storage.
 */

import { v4 as uuidv4 } from 'uuid';
import {
  ChecklistItemEntity,
  ChecklistItemCreateRequest,
  ChecklistItemUpdateRequest,
} from './checklistItemTypes';
import { ItemStatus } from '@/constants/itemStatus';
import { updateChecklistItemCounts } from '@/services/checklist/checklistLogic';

// In-memory storage
const checklistItems: Map<string, ChecklistItemEntity> = new Map();

const MAX_ITEMS_PER_CHECKLIST = 50;

/**
 * @summary
 * Creates a new checklist item
 *
 * @function checklistItemCreate
 * @module services/checklistItem
 *
 * @param {ChecklistItemCreateRequest} params - Item creation parameters
 *
 * @returns {Promise<ChecklistItemEntity>} Created item entity
 *
 * @throws {Error} When checklist has reached maximum items (50)
 *
 * @example
 * const item = await checklistItemCreate({
 *   checklistId: 'uuid-here',
 *   nome: 'Protetor solar',
 *   observacao: 'FPS 50+'
 * });
 */
export async function checklistItemCreate(
  params: ChecklistItemCreateRequest
): Promise<ChecklistItemEntity> {
  // Check item limit
  const existingItems = Array.from(checklistItems.values()).filter(
    (item) => item.checklistId === params.checklistId
  );

  if (existingItems.length >= MAX_ITEMS_PER_CHECKLIST) {
    throw new Error('O checklist já atingiu o limite de 50 itens');
  }

  // Calculate next order
  const maxOrder = existingItems.reduce((max, item) => Math.max(max, item.ordem), 0);

  // Create new item
  const item: ChecklistItemEntity = {
    id: uuidv4(),
    checklistId: params.checklistId,
    nome: params.nome,
    observacao: params.observacao,
    ordem: maxOrder + 1,
    status: ItemStatus.Pending,
  };

  checklistItems.set(item.id, item);

  // Update checklist counts
  updateItemCounts(params.checklistId);

  return item;
}

/**
 * @summary
 * Lists all items for a checklist with optional filtering
 *
 * @function checklistItemList
 * @module services/checklistItem
 *
 * @param {string} checklistId - Checklist identifier
 * @param {ItemStatus | 'Todos'} [statusFilter] - Optional status filter
 * @param {string} [searchText] - Optional search text for name/observation
 *
 * @returns {Promise<ChecklistItemEntity[]>} List of items
 *
 * @example
 * const items = await checklistItemList('uuid-here', ItemStatus.Pending, 'protetor');
 */
export async function checklistItemList(
  checklistId: string,
  statusFilter?: ItemStatus | 'Todos',
  searchText?: string
): Promise<ChecklistItemEntity[]> {
  let results = Array.from(checklistItems.values()).filter(
    (item) => item.checklistId === checklistId
  );

  // Apply status filter
  if (statusFilter && statusFilter !== 'Todos') {
    results = results.filter((item) => item.status === statusFilter);
  }

  // Apply search filter
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    results = results.filter(
      (item) =>
        item.nome.toLowerCase().includes(searchLower) ||
        (item.observacao && item.observacao.toLowerCase().includes(searchLower))
    );
  }

  // Sort by order
  results.sort((a, b) => a.ordem - b.ordem);

  return results;
}

/**
 * @summary
 * Gets a specific item by ID
 *
 * @function checklistItemGet
 * @module services/checklistItem
 *
 * @param {string} id - Item identifier
 *
 * @returns {Promise<ChecklistItemEntity>} Item entity
 *
 * @throws {Error} When item not found
 *
 * @example
 * const item = await checklistItemGet('uuid-here');
 */
export async function checklistItemGet(id: string): Promise<ChecklistItemEntity> {
  const item = checklistItems.get(id);

  if (!item) {
    throw new Error('Item não encontrado');
  }

  return item;
}

/**
 * @summary
 * Updates an existing item
 *
 * @function checklistItemUpdate
 * @module services/checklistItem
 *
 * @param {ChecklistItemUpdateRequest} params - Update parameters
 *
 * @returns {Promise<ChecklistItemEntity>} Updated item entity
 *
 * @throws {Error} When item not found
 *
 * @example
 * const updated = await checklistItemUpdate({
 *   id: 'uuid-here',
 *   nome: 'Protetor solar FPS 70',
 *   observacao: 'Comprar na farmácia'
 * });
 */
export async function checklistItemUpdate(
  params: ChecklistItemUpdateRequest
): Promise<ChecklistItemEntity> {
  const item = checklistItems.get(params.id);

  if (!item) {
    throw new Error('Item não encontrado');
  }

  // Update item
  item.nome = params.nome;
  item.observacao = params.observacao;

  checklistItems.set(item.id, item);

  return item;
}

/**
 * @summary
 * Deletes an item
 *
 * @function checklistItemDelete
 * @module services/checklistItem
 *
 * @param {string} id - Item identifier
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When item not found
 *
 * @example
 * await checklistItemDelete('uuid-here');
 */
export async function checklistItemDelete(id: string): Promise<void> {
  const item = checklistItems.get(id);

  if (!item) {
    throw new Error('Item não encontrado');
  }

  const checklistId = item.checklistId;

  checklistItems.delete(id);

  // Reorder remaining items
  const remainingItems = Array.from(checklistItems.values())
    .filter((i) => i.checklistId === checklistId)
    .sort((a, b) => a.ordem - b.ordem);

  remainingItems.forEach((item, index) => {
    item.ordem = index + 1;
    checklistItems.set(item.id, item);
  });

  // Update checklist counts
  updateItemCounts(checklistId);
}

/**
 * @summary
 * Updates item counts for a checklist (internal helper)
 *
 * @function updateItemCounts
 * @module services/checklistItem
 *
 * @param {string} checklistId - Checklist identifier
 *
 * @returns {void}
 */
function updateItemCounts(checklistId: string): void {
  const items = Array.from(checklistItems.values()).filter(
    (item) => item.checklistId === checklistId
  );

  const totalItens = items.length;
  const itensVerificados = items.filter((item) => item.status === ItemStatus.Verified).length;

  updateChecklistItemCounts(checklistId, totalItens, itensVerificados);
}
