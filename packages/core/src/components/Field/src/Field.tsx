import {
    ChangeEvent,
    ComponentProps,
    HTMLAttributes,
    KeyboardEvent,
    useCallback,
    useRef,
} from 'react';
import { isNull } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';
import { useAutoResize } from './useAutoresize';
import { RootProvider, useState } from './state/context';
export * as PinInput from './PinInput';
export * as NumberInput from './NumberInput';

export interface InputProps
    extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onKeyPress'> {}

interface RootProps {
    status?: 'error' | 'readonly' | 'warning' | 'default';
    collapsed?: boolean;
    required?: boolean;
    disabled?: boolean;
    value?: string;
}

export type Props = ComponentProps<typeof Root>;

export const Root = forward<RootProps, 'div'>(
    ({ collapsed, status = 'default', required = false, disabled, value, ...rest }, ref) => (
        <RootProvider disabled={disabled} value={value}>
            <styled.div
                {...rest}
                ref={ref}
                data-scope="field"
                data-part="root"
                data-collapsed={collapsed}
                data-status={status}
                data-required={required}
                data-disabled={required}
            />
        </RootProvider>
    ),
);

export const Input = forward<InputProps, 'input'>((props, ref) => {
    const { disabled } = useState();

    return (
        <styled.input
            disabled={disabled}
            {...props}
            data-scope="field"
            data-part="input"
            ref={ref}
        />
    );
});

/**
 * actually a "fake input" used for menus selectboxes etc.
 */
export const TriggerInput = forward<{ value?: string | number }, 'button'>(
    ({ children, value, id, ...rest }, ref) => {
        return (
            <styled.button
                {...rest}
                data-scope="field"
                data-part="input"
                data-tag="trigger"
                ref={ref}
            >
                {value}
                {children}
            </styled.button>
        );
    },
);

export const TextArea = forward<{}, 'textarea'>((props, ref) => {
    const { disabled } = useState();

    return (
        <styled.textarea
            disabled={disabled}
            {...props}
            data-scope="field"
            data-part="input"
            data-tag="textarea"
            ref={ref}
        />
    );
});

export const Multiline = forward<
    {
        onChange?: (
            value: string,
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => void;
    },
    'textarea'
>(({ onChange, maxLength, rows, onKeyDown, onKeyPress, ...rest }, externalRef) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const ref = externalRef ?? internalRef;

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>): void => {
            const target = event.target;
            const valueFromEvent = target.value;

            const haveToTrim = maxLength && target.value.length > maxLength;
            const value = haveToTrim ? valueFromEvent.substring(0, maxLength) : valueFromEvent;

            if (onChange) {
                onChange(value, event);
            }
        },
        [maxLength, onChange, maxLength],
    );

    const handleKeyPress = useCallback(
        (event: KeyboardEvent<HTMLTextAreaElement>): void => {
            if (maxLength) {
                const target = event.target as HTMLInputElement;

                if (isNull(target.selectionEnd) || isNull(target.selectionStart)) {
                    return;
                }

                const isReplacing = target.selectionEnd - target.selectionStart;

                if (!isReplacing && target.value.length === maxLength) {
                    event.preventDefault();
                    event.stopPropagation();

                    return;
                }
            }

            if (onKeyPress) {
                onKeyPress(event);
            }

            if (onKeyDown) {
                onKeyDown(event);
            }
        },
        [onKeyPress, onKeyDown, maxLength],
    );

    //@ts-ignore
    useAutoResize(ref.current, rows ?? 1);

    return (
        <styled.textarea
            {...rest}
            data-scope="field"
            data-part="textarea"
            ref={ref}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
        />
    );
});

export const Icon = forward<{ position?: string }, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            data-scope="field"
            data-part="icon"
            ref={ref}
            data-position={props.position}
        />
    );
});

export const FloatingIcon = forward<{ position?: string }, 'div'>((props, ref) => {
    return <Icon {...props} ref={ref} data-tag="floating" />;
});

export const Counter = forward<
    {
        length: number;
        maxLength: number;
    },
    'span'
>(({ length, maxLength, ...rest }, ref) => {
    return (
        <styled.span {...rest} data-scope="field" data-part="counter" ref={ref}>
            {length}/{maxLength}
        </styled.span>
    );
});

export const Label = forward<{}, 'label'>(({ children, ...rest }, ref) => {
    return (
        // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
        <styled.label
            {...rest}
            data-scope="field"
            data-part="label"
            title={rest?.title ?? (typeof children === 'string' && children)}
            ref={ref}
        >
            {children}
        </styled.label>
    );
});

export const FloatingLabel = forward<{}, 'label'>(({ className, ...rest }, ref) => {
    return <Label {...rest} ref={ref} data-tag="floating-top" />;
});

export const Hint = forward<{}, 'span'>((props, ref) => {
    return <styled.span {...props} ref={ref} data-scope="field" data-part="hint" />;
});

export const FloatingHint = forward<{}, 'span'>((props, ref) => {
    return <Hint {...props} ref={ref} data-tag="floating-bottom" />;
});

export const Error = forward<{ oneLine?: boolean }, 'span'>((props, ref) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="error"
            data-one-line={props.oneLine}
            ref={ref}
        />
    );
});

export const FloatingError = forward<{}, 'span'>((props, ref) => {
    return <Error {...props} ref={ref} data-tag="floating-bottom" />;
});

export const Bar = forward<{}, 'span'>((props, ref) => {
    return (
        <styled.span
            {...props}
            ref={ref}
            data-scope="field"
            data-part="bar"
            className="before:h-px after:h-px before:bg-[var(--border-focus)] after:bg-[var(--border-focus)]"
        />
    );
});
