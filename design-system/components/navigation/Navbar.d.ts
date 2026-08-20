import React from 'react';
/**
 * @startingPoint section="Components" subtitle="Site header with wordmark, links and CTA slot" viewport="700x100"
 */
export interface NavLink {
  label: string;
  href?: string;
}
export interface NavbarProps {
  logo?: string;
  links?: NavLink[];
  cta?: React.ReactNode;
}
