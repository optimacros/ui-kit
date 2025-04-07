import { ChangeEvent } from 'react';
import type React from 'react';

import { forward } from '@optimacros-ui/store';

export interface RadioButtonProps {
    checked?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string | React.ReactNode;
    placeholder?: string;
    name?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    theme?: {
        disabled?: string;
        field?: string;
        input?: string;
        text?: string;
    };
    value?: string;
}

export const RadioButton = forward<RadioButtonProps, HTMLInputElement>(
    (
        {
            checked = false,
            className = '',
            disabled = false,
            children,
            label,
            name,
            onChange,
            onMouseEnter,
            onMouseLeave,
            onClick,
            theme = {},
            placeholder,
            ...others
        },
        ref,
    ) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (!disabled && !checked && onChange) {
                onChange(event);
            }
        };

        const state = {
            'data-state': checked ? 'checked' : 'unchecked',
            ...(disabled ? { 'data-disabled': true } : {}),
        };

        return (
            <div data-scope="radio-group" data-part="root" {...state} className={theme.field}>
                <label
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    data-scope="radio-group"
                    data-part="item"
                    {...state}
                >
                    <div
                        {...others}
                        role="radio"
                        aria-checked={checked}
                        tabIndex={0}
                        data-scope="radio-group"
                        data-part="control"
                        className={theme.input}
                        {...state}
                    />
                    <input
                        type="radio"
                        checked={checked}
                        disabled={disabled}
                        name={name}
                        onChange={handleChange}
                        ref={ref}
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            pointerEvents: 'none',
                        }}
                        {...others}
                    />
                    {label && (
                        <span
                            data-scope="radio-group"
                            data-part="text"
                            className={theme.text}
                            {...state}
                        >
                            {label || placeholder}
                        </span>
                    )}
                    {children}
                </label>
            </div>
        );
    },
    { displayName: 'RadioButton' },
);
