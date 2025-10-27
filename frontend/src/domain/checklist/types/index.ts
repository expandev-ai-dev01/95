/**
 * @types Checklist
 * @summary Type definitions for checklist domain
 * @domain checklist
 */

export type TripType =
  | 'Praia'
  | 'Negócios'
  | 'Internacional'
  | 'Camping'
  | 'Cruzeiro'
  | 'Cidade'
  | 'Outro';

export type SortOrder = 'Mais recentes' | 'Mais antigos' | 'Alfabética (A-Z)' | 'Alfabética (Z-A)';

export interface Checklist {
  id: string;
  nome: string;
  tipoViagem: TripType;
  descricao?: string;
  dataCriacao: string;
  dataAtualizacao?: string;
  totalItens: number;
  itensVerificados: number;
}

export interface CreateChecklistDto {
  nome: string;
  tipoViagem: TripType;
  descricao?: string;
}

export interface UpdateChecklistDto {
  nome: string;
  tipoViagem: TripType;
  descricao?: string;
}

export interface ChecklistListParams {
  tipoViagem?: TripType | 'Todos';
  ordenacao?: SortOrder;
}

export const TRIP_TYPES: TripType[] = [
  'Praia',
  'Negócios',
  'Internacional',
  'Camping',
  'Cruzeiro',
  'Cidade',
  'Outro',
];

export const SORT_ORDERS: SortOrder[] = [
  'Mais recentes',
  'Mais antigos',
  'Alfabética (A-Z)',
  'Alfabética (Z-A)',
];
