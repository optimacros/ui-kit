export type { ValueChangeDetails } from '@zag-js/tabs';

export interface Tab {
    fixed?: boolean;
    disabled?: boolean;
    value: string;
    index?: number;
    meta?: Record<string, any>;
}
