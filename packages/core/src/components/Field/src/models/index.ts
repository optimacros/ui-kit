import { ChangeEvent, HTMLAttributes } from 'react';

export type Callback = 'onChange' | 'onKeyPress' | 'onKeyDown';

/** Delay in milliseconds. Global or callback-specific. */
export type DebounceSettings = number | { [key in Callback]?: number };

export interface InputProps
    extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onKeyPress'> {
    debounce?: DebounceSettings;
}

export interface TextAreaProps
    extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onKeyPress'> {
    debounce?: DebounceSettings;
}

// Зачем свой onChange у мультилайна?
export interface MultilineProps extends TextAreaProps {
    onChange?: (value: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface RootProps {
    status?: FieldStatus;
    collapsed?: boolean;
    required?: boolean;
    disabled?: boolean;
}

export type FieldStatus = 'error' | 'readonly' | 'warning' | 'default';
