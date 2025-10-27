/**
 * @summary
 * Checklist type definitions
 *
 * @module services/checklist/checklistTypes
 *
 * @description
 * Type definitions for checklist entities and operations.
 */

import { TripType } from '@/constants/tripType';

/**
 * @interface ChecklistEntity
 * @description Represents a checklist entity
 *
 * @property {string} id - Unique checklist identifier (UUID)
 * @property {string} nome - Checklist name
 * @property {TripType} tipoViagem - Trip type category
 * @property {string | null} descricao - Optional description
 * @property {Date} dataCriacao - Creation timestamp
 * @property {Date} dataAtualizacao - Last update timestamp
 * @property {number} totalItens - Total number of items
 * @property {number} itensVerificados - Number of verified items
 */
export interface ChecklistEntity {
  id: string;
  nome: string;
  tipoViagem: TripType;
  descricao: string | null;
  dataCriacao: Date;
  dataAtualizacao: Date;
  totalItens: number;
  itensVerificados: number;
}

/**
 * @interface ChecklistCreateRequest
 * @description Request parameters for creating a checklist
 *
 * @property {string} nome - Checklist name (3-50 characters)
 * @property {TripType} tipoViagem - Trip type category
 * @property {string | null} descricao - Optional description (max 200 characters)
 */
export interface ChecklistCreateRequest {
  nome: string;
  tipoViagem: TripType;
  descricao: string | null;
}

/**
 * @interface ChecklistUpdateRequest
 * @description Request parameters for updating a checklist
 *
 * @property {string} id - Checklist identifier
 * @property {string} nome - Updated checklist name (3-50 characters)
 * @property {TripType} tipoViagem - Updated trip type category
 * @property {string | null} descricao - Updated description (max 200 characters)
 */
export interface ChecklistUpdateRequest {
  id: string;
  nome: string;
  tipoViagem: TripType;
  descricao: string | null;
}

/**
 * @interface ChecklistListResponse
 * @description Response format for checklist list
 *
 * @property {string} id - Checklist identifier
 * @property {string} nome - Checklist name
 * @property {TripType} tipoViagem - Trip type category
 * @property {string | null} descricao - Optional description
 * @property {Date} dataCriacao - Creation timestamp
 * @property {number} totalItens - Total number of items
 * @property {number} itensVerificados - Number of verified items
 * @property {number} progresso - Progress percentage (0-100)
 */
export interface ChecklistListResponse {
  id: string;
  nome: string;
  tipoViagem: TripType;
  descricao: string | null;
  dataCriacao: Date;
  totalItens: number;
  itensVerificados: number;
  progresso: number;
}
