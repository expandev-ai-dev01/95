/**
 * @summary
 * Checklist business logic
 *
 * @module services/checklist/checklistLogic
 *
 * @description
 * Contains business logic for checklist operations using in-memory storage.
 */

import { v4 as uuidv4 } from 'uuid';
import {
  ChecklistEntity,
  ChecklistCreateRequest,
  ChecklistUpdateRequest,
  ChecklistListResponse,
} from './checklistTypes';
import { TripType } from '@/constants/tripType';

// In-memory storage
const checklists: Map<string, ChecklistEntity> = new Map();

/**
 * @summary
 * Creates a new checklist
 *
 * @function checklistCreate
 * @module services/checklist
 *
 * @param {ChecklistCreateRequest} params - Checklist creation parameters
 *
 * @returns {Promise<ChecklistEntity>} Created checklist entity
 *
 * @throws {Error} When checklist name already exists
 * @throws {Error} When validation fails
 *
 * @example
 * const checklist = await checklistCreate({
 *   nome: 'Viagem para Praia',
 *   tipoViagem: TripType.Beach,
 *   descricao: 'Checklist para férias na praia'
 * });
 */
export async function checklistCreate(params: ChecklistCreateRequest): Promise<ChecklistEntity> {
  // Validate unique name
  const existingChecklist = Array.from(checklists.values()).find(
    (c) => c.nome.toLowerCase() === params.nome.toLowerCase()
  );

  if (existingChecklist) {
    throw new Error('Você já possui um checklist com este nome');
  }

  // Create new checklist
  const now = new Date();
  const checklist: ChecklistEntity = {
    id: uuidv4(),
    nome: params.nome,
    tipoViagem: params.tipoViagem,
    descricao: params.descricao,
    dataCriacao: now,
    dataAtualizacao: now,
    totalItens: 0,
    itensVerificados: 0,
  };

  checklists.set(checklist.id, checklist);

  return checklist;
}

/**
 * @summary
 * Lists all checklists with optional filtering
 *
 * @function checklistList
 * @module services/checklist
 *
 * @param {TripType | 'Todos'} [tipoViagem] - Optional trip type filter
 * @param {'Mais recentes' | 'Mais antigos' | 'Alfabética (A-Z)' | 'Alfabética (Z-A)'} [ordenacao] - Sort order
 *
 * @returns {Promise<ChecklistListResponse[]>} List of checklists
 *
 * @example
 * const checklists = await checklistList(TripType.Beach, 'Mais recentes');
 */
export async function checklistList(
  tipoViagem?: TripType | 'Todos',
  ordenacao:
    | 'Mais recentes'
    | 'Mais antigos'
    | 'Alfabética (A-Z)'
    | 'Alfabética (Z-A)' = 'Mais recentes'
): Promise<ChecklistListResponse[]> {
  let results = Array.from(checklists.values());

  // Apply filter
  if (tipoViagem && tipoViagem !== 'Todos') {
    results = results.filter((c) => c.tipoViagem === tipoViagem);
  }

  // Apply sorting
  switch (ordenacao) {
    case 'Mais recentes':
      results.sort((a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime());
      break;
    case 'Mais antigos':
      results.sort((a, b) => a.dataCriacao.getTime() - b.dataCriacao.getTime());
      break;
    case 'Alfabética (A-Z)':
      results.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case 'Alfabética (Z-A)':
      results.sort((a, b) => b.nome.localeCompare(a.nome));
      break;
  }

  // Map to response format with progress calculation
  return results.map((c) => ({
    id: c.id,
    nome: c.nome,
    tipoViagem: c.tipoViagem,
    descricao: c.descricao,
    dataCriacao: c.dataCriacao,
    totalItens: c.totalItens,
    itensVerificados: c.itensVerificados,
    progresso: c.totalItens > 0 ? Math.round((c.itensVerificados / c.totalItens) * 100) : 0,
  }));
}

/**
 * @summary
 * Gets a specific checklist by ID
 *
 * @function checklistGet
 * @module services/checklist
 *
 * @param {string} id - Checklist identifier
 *
 * @returns {Promise<ChecklistEntity>} Checklist entity
 *
 * @throws {Error} When checklist not found
 *
 * @example
 * const checklist = await checklistGet('uuid-here');
 */
export async function checklistGet(id: string): Promise<ChecklistEntity> {
  const checklist = checklists.get(id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  return checklist;
}

/**
 * @summary
 * Updates an existing checklist
 *
 * @function checklistUpdate
 * @module services/checklist
 *
 * @param {ChecklistUpdateRequest} params - Update parameters
 *
 * @returns {Promise<ChecklistEntity>} Updated checklist entity
 *
 * @throws {Error} When checklist not found
 * @throws {Error} When new name already exists
 *
 * @example
 * const updated = await checklistUpdate({
 *   id: 'uuid-here',
 *   nome: 'Novo Nome',
 *   tipoViagem: TripType.Business,
 *   descricao: 'Nova descrição'
 * });
 */
export async function checklistUpdate(params: ChecklistUpdateRequest): Promise<ChecklistEntity> {
  const checklist = checklists.get(params.id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  // Validate unique name (excluding current checklist)
  const existingChecklist = Array.from(checklists.values()).find(
    (c) => c.id !== params.id && c.nome.toLowerCase() === params.nome.toLowerCase()
  );

  if (existingChecklist) {
    throw new Error('Você já possui outro checklist com este nome');
  }

  // Update checklist
  checklist.nome = params.nome;
  checklist.tipoViagem = params.tipoViagem;
  checklist.descricao = params.descricao;
  checklist.dataAtualizacao = new Date();

  checklists.set(checklist.id, checklist);

  return checklist;
}

/**
 * @summary
 * Deletes a checklist
 *
 * @function checklistDelete
 * @module services/checklist
 *
 * @param {string} id - Checklist identifier
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When checklist not found
 *
 * @example
 * await checklistDelete('uuid-here');
 */
export async function checklistDelete(id: string): Promise<void> {
  const checklist = checklists.get(id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  checklists.delete(id);
}

/**
 * @summary
 * Updates item counts for a checklist (internal use)
 *
 * @function updateChecklistItemCounts
 * @module services/checklist
 *
 * @param {string} checklistId - Checklist identifier
 * @param {number} totalItens - Total number of items
 * @param {number} itensVerificados - Number of verified items
 *
 * @returns {void}
 */
export function updateChecklistItemCounts(
  checklistId: string,
  totalItens: number,
  itensVerificados: number
): void {
  const checklist = checklists.get(checklistId);

  if (checklist) {
    checklist.totalItens = totalItens;
    checklist.itensVerificados = itensVerificados;
    checklist.dataAtualizacao = new Date();
    checklists.set(checklistId, checklist);
  }
}
