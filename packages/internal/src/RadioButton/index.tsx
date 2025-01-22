import React, { useRef, MouseEvent } from 'react';

interface RadioButtonProps {
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

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
        if (!disabled && !checked && onChange) {
            onChange(event);
        }
    };

    return (
        <label onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <input
                {...others}
                ref={inputNode}
                checked={checked}
                disabled={disabled}
                name={name}
                type="radio"
                onChange={() => {}}
                onClick={handleClick}
            />
            <div checked={checked} disabled={disabled} />
            {label && <span>{label || placeholder}</span>}
            {children}
        </label>
    );
};
