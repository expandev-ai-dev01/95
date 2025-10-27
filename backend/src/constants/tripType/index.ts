/**
 * @summary
 * Trip type constants
 *
 * @module constants/tripType
 *
 * @description
 * Defines available trip types for checklist categorization.
 */

export enum TripType {
  Beach = 'Praia',
  Business = 'Negócios',
  International = 'Internacional',
  Camping = 'Camping',
  Cruise = 'Cruzeiro',
  City = 'Cidade',
  Other = 'Outro',
}

export const TRIP_TYPES = Object.values(TripType);
