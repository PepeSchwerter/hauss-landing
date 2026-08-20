import React from 'react';
export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'dark' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  /** Optional trailing icon node (e.g. an arrow glyph) */
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
