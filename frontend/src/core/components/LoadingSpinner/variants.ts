/**
 * @variants LoadingSpinner
 * @summary Style variants for LoadingSpinner component
 */

import { clsx } from 'clsx';
import type { LoadingSpinnerProps } from './types';

export function getLoadingSpinnerClassName(props: LoadingSpinnerProps): string {
  const { size = 'md', className } = props;

  return clsx(
    'flex items-center justify-center',
    {
      'h-4 w-4': size === 'sm',
      'h-8 w-8': size === 'md',
      'h-12 w-12': size === 'lg',
    },
    className
  );
}
