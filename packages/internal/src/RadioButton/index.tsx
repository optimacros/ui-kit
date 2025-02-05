//@ts-nocheck

import React, { useRef, MouseEvent } from 'react';

export interface RadioButtonProps {
    checked?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string | React.ReactNode;
    name?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onChange?: (event: MouseEvent<HTMLInputElement>, scope: any) => void;
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

export const RadioButton: RadioButtonProps = ({
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
    theme,
    placeholder,
    ...others
}) => {
    const inputNode = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: MouseEvent<HTMLInputElement>) => {
        if (!disabled && !checked && onChange) {
            onChange(event);
        }
    };

    const state = {
        'data-state': checked ? 'checked' : 'unchecked',
        ...(disabled ? { 'data-disabled': true } : {}),
    };

    return (
        <div data-scope="radio-group" data-part="root" {...state}>
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
                    {...state}
                />
                <input
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    name={name}
                    onChange={handleChange}
                    ref={inputNode}
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        pointerEvents: 'none',
                    }}
                    {...others}
                />
                {label && (
                    <span data-scope="radio-group" data-part="text" {...state}>
                        {label || placeholder}
                    </span>
                )}
                {children}
            </label>
        </div>
    );
};
