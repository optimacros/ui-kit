import React, { useRef, MouseEvent, useCallback } from 'react';
import { RadioProps } from './Radio';

interface RadioButtonComponentProps {
    Radio: React.FC<RadioProps>;
    checked?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string | React.ReactNode;
    tooltipOffset?: number;
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

const RadioButtonComponent: RadioButtonComponentProps = ({
    checked = false,
    className = '',
    disabled = false,
    children,
    label,
    tooltipOffset,
    name,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onClick,
    theme,
    Radio,
    ...others
}) => {
    const inputNode = useRef<HTMLInputElement | null>(null);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLInputElement>) => {
            if (!disabled && !checked && onChange) {
                onChange(event, this);
            }
        },
        [checked, disabled, onChange],
    );

    return (
        <label onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <input
                {...others}
                ref={inputNode}
                checked={checked}
                className={theme?.input}
                disabled={disabled}
                name={name}
                type="radio"
                onChange={() => {}}
                onClick={handleClick}
            />
            <Radio checked={checked} disabled={disabled} theme={theme} />
            {label && <span className={theme?.text}>{label}</span>}
            {children}
        </label>
    );
};

export default RadioButtonComponent;
