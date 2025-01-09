import { ReactNode } from 'react';

export interface Tab {
    value: string;
    content: ReactNode;
}

export type { ValueChangeDetails } from '@zag-js/tabs';
