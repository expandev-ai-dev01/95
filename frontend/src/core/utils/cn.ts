/**
 * @utility cn
 * @summary Utility for merging Tailwind CSS classes
 * @category styling
 */

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
