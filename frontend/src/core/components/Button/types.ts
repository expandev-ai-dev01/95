/**
 * @types Button
 * @summary Type definitions for Button component
 */

import { ReactNode, MouseEvent } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
