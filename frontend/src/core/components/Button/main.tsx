/**
 * @component Button
 * @summary Reusable button component
 * @domain core
 * @type ui-component
 * @category form
 */

import { getButtonClassName } from './variants';
import type { ButtonProps } from './types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={getButtonClassName({ variant, size, fullWidth, className })}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
          Carregando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
