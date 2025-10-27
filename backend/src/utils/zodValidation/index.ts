/**
 * @summary
 * Zod validation utilities
 *
 * @module utils/zodValidation
 *
 * @description
 * Provides reusable Zod validation schemas and helpers for common data types.
 */

import { z } from 'zod';

/**
 * @summary String validation with max length
 * @description Validates non-empty strings with optional max length
 */
export const zString = (maxLength?: number) => {
  let schema = z.string().min(1, 'Field is required');
  if (maxLength) {
    schema = schema.max(maxLength, `Field must not exceed ${maxLength} characters`);
  }
  return schema;
};

/**
 * @summary Nullable string validation with max length
 * @description Validates strings that can be null, with optional max length
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength, `Field must not exceed ${maxLength} characters`);
  }
  return schema.nullable();
};

/**
 * @summary Name validation
 * @description Validates names with min 1 and max 200 characters
 */
export const zName = z
  .string()
  .min(1, 'Name is required')
  .max(200, 'Name must not exceed 200 characters');

/**
 * @summary Description validation
 * @description Validates descriptions with max 500 characters
 */
export const zDescription = z.string().max(500, 'Description must not exceed 500 characters');

/**
 * @summary Nullable description validation
 * @description Validates descriptions that can be null, with max 500 characters
 */
export const zNullableDescription = z
  .string()
  .max(500, 'Description must not exceed 500 characters')
  .nullable();

/**
 * @summary Positive integer validation
 * @description Validates positive integers (greater than 0)
 */
export const zPositiveInt = z.number().int('Must be an integer').positive('Must be greater than 0');

/**
 * @summary Foreign key validation
 * @description Validates foreign key references (positive integers)
 */
export const zFK = z.number().int('Must be an integer').positive('Invalid reference');

/**
 * @summary Nullable foreign key validation
 * @description Validates foreign key references that can be null
 */
export const zNullableFK = z
  .number()
  .int('Must be an integer')
  .positive('Invalid reference')
  .nullable();

/**
 * @summary Boolean bit validation
 * @description Validates boolean values (0 or 1)
 */
export const zBit = z.boolean();

/**
 * @summary Date string validation
 * @description Validates ISO date strings
 */
export const zDateString = z.string().datetime('Invalid date format');

/**
 * @summary Email validation
 * @description Validates email addresses
 */
export const zEmail = z.string().email('Invalid email address');

/**
 * @summary UUID validation
 * @description Validates UUID strings
 */
export const zUUID = z.string().uuid('Invalid UUID format');

/**
 * @summary Checklist name validation
 * @description Validates checklist names (3-50 characters, no special chars except - and _)
 */
export const zChecklistName = z
  .string()
  .min(3, 'O nome deve ter pelo menos 3 caracteres')
  .max(50, 'O nome deve ter no máximo 50 caracteres')
  .regex(
    /^[a-zA-Z0-9\s\-_]+$/,
    'O nome não pode conter caracteres especiais exceto hífen e underscore'
  );

/**
 * @summary Item name validation
 * @description Validates item names (2-100 characters)
 */
export const zItemName = z
  .string()
  .min(2, 'O nome deve ter pelo menos 2 caracteres')
  .max(100, 'O nome deve ter no máximo 100 caracteres');

/**
 * @summary Observation validation
 * @description Validates observations (max 200 characters, nullable)
 */
export const zObservation = z
  .string()
  .max(200, 'A observação deve ter no máximo 200 caracteres')
  .nullable();
