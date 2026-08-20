import React from 'react';
export interface TagProps {
  tone?: 'ink' | 'yellow' | 'red' | 'pink' | 'outline';
  children: React.ReactNode;
}
