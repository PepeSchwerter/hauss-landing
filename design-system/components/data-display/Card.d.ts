import React from 'react';
export interface CardProps {
  image?: string;
  tag?: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}
