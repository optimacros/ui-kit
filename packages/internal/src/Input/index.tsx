import React, { useId } from 'react';
import type { TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import { isNull, isUndefined } from '@optimacros-ui/utils';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';

export type InputTheme = {
    bar: string;
    counter: string;
    disabled: string;
    error: string;
    oneLineError: string;
    errored: string;
    hidden: string;
    hint: string;
    icon: string;
    input: string;
    inputElement: string;
    required: string;
    withIcon: string;
    collapsed: string;
    filled: string;
    fixed: string;
    label: string;
};

type HTMLAttributes = TextareaHTMLAttributes<HTMLTextAreaElement> &
    InputHTMLAttributes<HTMLInputElement>;

export interface InputProps extends Omit<HTMLAttributes, 'onChange' | 'onKeyPress' | 'id'> {
    onChange?: (
        value: string,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    multiline?: boolean;
    floating?: boolean;
    label?: string | React.JSX.Element;
    error?: string | React.JSX.Element | null;
    oneLineError?: boolean;
    hint?: string | React.JSX.Element;
    collapsed?: boolean;
    icon?: string | React.JSX.Element;
    theme?: Partial<InputTheme>;
    className?: string;
    readonly?: boolean;
    id?: string | number;
}

const getStatus = (error: boolean, readOnly: boolean, warning: boolean) => {
    switch (true) {
        case error:
            return 'error';
        case readOnly:
            return 'readonly';
        case warning:
            return 'warning';
        default:
            return 'default';
    }
};

export const Input = ({
    value,
    role = 'input',
    type = 'text',
    rows = 1,
    collapsed = false,
    disabled = false,
    multiline = false,
    required = false,
    floating = true,
    defaultValue,
    error,
    oneLineError,
    hint = '',
    icon,
    label,
    maxLength,
    theme: customTheme,
    onKeyPress,
    onKeyDown,
    className,
    onChange,
    id,
    readOnly = false,
    autoFocus,
    name,
    ...others
}: InputProps) => {
    const elementProps = {
        ...others,
        role,
        defaultValue,
        required,
        readOnly,
        maxLength,
    };

    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const length = !isUndefined(maxLength) && !isUndefined(value) ? value.toString().length : 0;
    const labelText = !collapsed ? label : '';
    const fieldValue = isNull(value) ? '' : value;

    return (
        <Field.Root
            {...elementProps}
            status={oneLineError ? 'default' : getStatus(Boolean(error), readOnly, false)}
        >
            {icon && (
                <Field.FloatingIcon>
                    <Icon value={icon} />
                </Field.FloatingIcon>
            )}
            {labelText && (
                <Field.FloatingLabel htmlFor={fieldId as string}>{labelText}</Field.FloatingLabel>
            )}
            {multiline ? (
                <Field.Multiline
                    id="test"
                    rows={3}
                    value={fieldValue}
                    defaultValue={defaultValue}
                    autoFocus={autoFocus}
                    onChange={onChange}
                    name={name}
                />
            ) : (
                <Field.Input
                    autoFocus={autoFocus}
                    type={type}
                    id={fieldId as string}
                    name={name}
                    disabled={disabled}
                    value={fieldValue}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange?.(e.target.value, e)}
                />
            )}
            {maxLength && <Field.Counter length={length} maxLength={maxLength} />}
            {hint && <Field.FloatingHint>{hint}</Field.FloatingHint>}
            {error && <Field.FloatingError>{error}</Field.FloatingError>}
        </Field.Root>
    );
};
