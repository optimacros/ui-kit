import { ComponentProps, ReactNode } from 'react';
import { Tabs } from '..';

export type TabsProps = ComponentProps<typeof Tabs.RootProvider>;

export interface Tab {
    /** Tab title */
    value: string;
    /** Tab content */
    content: ReactNode;
    meta?: Record<string, any>;
    /** Tab is always aligned to the left */
    fixed?: boolean;
    /** Tab is disabled */
    disabled?: boolean;
    /** да, просто запусти мап и добавь индекс к своим табам */
    index: number;
}

export type DraggableMode = 'ordered' | 'swap';

export type { ValueChangeDetails } from '@zag-js/tabs';
