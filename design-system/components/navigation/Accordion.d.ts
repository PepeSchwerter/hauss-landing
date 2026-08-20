import React from 'react';
/**
 * @startingPoint section="Components" subtitle="Expand/collapse list for services or FAQs" viewport="700x260"
 */
export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}
export interface AccordionProps {
  items: AccordionItem[];
}
