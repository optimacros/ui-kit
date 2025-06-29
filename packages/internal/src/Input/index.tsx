import { InputHTMLAttributes, TextareaHTMLAttributes, useId } from 'react';
import type React from 'react';
import { clsx, isNull, isUndefined } from '@optimacros-ui/utils';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';
import { forward } from '@optimacros-ui/store';
import './styles.css';

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

export interface InputProps
    extends Omit<HTMLAttributes, 'onChange' | 'onKeyPress' | 'onKeyDown' | 'id'> {
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
    id?: string;
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

export const Input = forward<InputProps, HTMLInputElement>(
    (
        {
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
            onFocus,
            id,
            readOnly = false,
            autoFocus,
            name: nameProp,
            placeholder,
            theme = {},
            ...others
        },
        ref,
    ) => {
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

        const cn = clsx(
            theme.input,
            {
                [theme.collapsed]: collapsed,
                [theme.disabled]: disabled,
                [theme.errored]: error,
                [theme.oneLineError]: oneLineError,
                [theme.hidden]: type === 'hidden',
                [theme.withIcon]: icon,
            },
            'Input-module__input',
            className,
        );

        const name = others['data-name'] || nameProp;

        return (
            <Field.Root
                {...elementProps}
                status={getStatus(Boolean(error), readOnly, false)}
                className={cn}
                data-tag="internal"
                data-testid="input"
            >
                {icon && (
                    <Field.FloatingIcon data-testid="input-icon">
                        <Icon value={icon} className={theme.icon} />
                    </Field.FloatingIcon>
                )}
                {labelText && (
                    <Field.FloatingLabel
                        htmlFor={fieldId as string}
                        className={theme.label}
                        data-testid="input-label"
                    >
                        {labelText}
                    </Field.FloatingLabel>
                )}
                {multiline ? (
                    <Field.Multiline
                        id="test"
                        rows={3}
                        value={fieldValue}
                        defaultValue={defaultValue}
                        autoFocus={autoFocus}
                        onChange={onChange}
                        onFocus={onFocus}
                        name={name}
                        className={theme.inputElement}
                        onKeyDown={onKeyDown}
                        data-testid="input-textarea"
                        disabled={disabled}
                    />
                ) : (
                    <Field.Input
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        type={type}
                        id={fieldId as string}
                        name={name}
                        disabled={disabled}
                        value={fieldValue}
                        defaultValue={defaultValue}
                        onChange={(e) => onChange?.(e.target.value, e)}
                        onFocus={onFocus}
                        className={theme.inputElement}
                        ref={ref}
                        onKeyDown={onKeyDown}
                        data-testid="input-input"
                    />
                )}
                {maxLength && (
                    <Field.Counter
                        length={length}
                        maxLength={maxLength}
                        className={theme.counter}
                        data-testid="input-counter"
                    />
                )}
                {hint && (
                    <Field.FloatingHint className={theme.hint} data-testid="input-hint">
                        {hint}
                    </Field.FloatingHint>
                )}
                {error && (
                    <Field.FloatingError
                        className={clsx(theme.error, 'FieldError')}
                        data-testid="input-error"
                    >
                        {error}
                    </Field.FloatingError>
                )}
            </Field.Root>
        );
    },
);
