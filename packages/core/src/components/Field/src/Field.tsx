import { ChangeEvent, HTMLAttributes, KeyboardEvent, useCallback, useRef } from 'react';
import { clsx, isNull, tw } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';
import { useAutoResize } from './useAutoresize';

export interface InputProps extends Omit<HTMLAttributes, 'onChange' | 'onKeyPress'> {}

export const rootClassName = 'relative py-4 has-data-[part=icon]:ml-8 box-border flex group';
export const Root = forward<{ status?: 'error' | 'readonly' | 'warning' | 'default' }, 'div'>(
    ({ collapsed, status = 'default', ...rest }) => (
        <styled.div
            {...rest}
            data-scope="field"
            data-part="root"
            data-collapsed={collapsed}
            data-status={status}
            className={rootClassName}
        />
    ),
);

export const inputClassName = tw`
peer box-border py-2 px-0
border-0 border-b border-solid border-[var(--border)]
focus:border-[var(--border-focus)]

disabled:border-dashed disabled:text-[var(--text-disabled)]
disabled:border-[var(--border-disabled)]

text-[var(--text)]  focus:text-[var(--text-focus)] 
bg-[var(--bg)] group-data-[collapsed=true]:p-0 outline-none text-md
text-start

grow-1 group-data-[status=readonly]:pointer-events-none

peer
`;

export const Input = forward<{}, 'input'>((props, ref) => {
    return (
        <styled.input
            {...props}
            data-scope="field"
            data-part="input"
            ref={ref}
            className={inputClassName}
        />
    );
});

export const triggerInputClassName = clsx(
    inputClassName,
    tw`cursor-pointer flex justify-between align-center text-center`,
);
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
                className={triggerInputClassName}
                ref={ref}
            >
                {value}
                {children}
            </styled.button>
        );
    },
);

const textAreaClassName = clsx(inputClassName, 'border-1');
export const TextArea = forward<{}, 'textarea'>((props, ref) => {
    return (
        <styled.textarea
            {...props}
            data-scope="field"
            data-part="input"
            data-tag="textarea"
            ref={ref}
            className={textAreaClassName}
        />
    );
});

export const Multiline = forward<{}, 'textarea'>(
    ({ onChange, maxLength, rows, onKeyDown, onKeyPress, ...rest }, externalRef) => {
        const internalRef = useRef(null);

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
    },
);

export const iconClassName = 'text-[var(--text)] peer-focus:text-[var(--text-focus)]';
export const Icon = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            className={iconClassName}
            {...props}
            data-scope="field"
            data-part="icon"
            ref={ref}
        />
    );
});

export const floatingIconClassName = clsx(iconClassName, 'absolute top-6 -left-8');
export const FloatingIcon = forward<{}, 'div'>((props, ref) => {
    return <Icon {...props} className={floatingIconClassName} ref={ref} data-tag="floating" />;
});
export const counterClassName =
    'absolute right-0 -bottom-1 peer-focus:text-[var(--text-focus)] text-[var(--text)]';
export const Counter = forward<
    {
        length: number;
        maxLength: number;
    },
    'span'
>(({ length, maxLength, ...rest }, ref) => {
    return (
        <styled.span
            {...rest}
            data-scope="field"
            data-part="counter"
            ref={ref}
            className={counterClassName}
        >
            {length}/{maxLength}
        </styled.span>
    );
});

export const floatingTopClassName = tw`
group-data-[collapsed=true]:top-1/2 group-data-[collapsed=true]:-translate-y-1/2
absolute top-0 left-0  pointer-events-none
`;

export const floatingBottomClassName = tw`group-data-[collapsed=true]:top-1/2 group-data-[collapsed=true]:-translate-y-1/2
left-0 absolute peer-focus:block hidden
peer-focus:opacity-100 peer-[.filled]:opacity-0 -bottom-1 pointer-events-none`;

export const labelClassName =
    'flex text-[var(--text)] peer-focus:text-[var(--text-focus)] group-data-[status=error]:text-[var(--text-error)]';
export const Label = forward<{}, 'label'>(({ children, ...rest }, ref) => {
    return (
        <styled.label
            {...rest}
            className={rest.className ?? labelClassName}
            data-scope="field"
            data-part="label"
            title={rest?.title ?? (typeof children === 'string' && children)}
            ref={ref}
        >
            {children}
            <span className="hidden text-[var(--text)]" data-scope="field" data-part="label-star">
                *
            </span>
        </styled.label>
    );
});

export const floatingLabelClassName = clsx(labelClassName, floatingTopClassName);
export const FloatingLabel = forward<{}, 'label'>(({ className, ...rest }, ref) => {
    return <Label {...rest} className={floatingLabelClassName} ref={ref} />;
});

export const hintClassName = 'peer-focus:text-[var(--text-focus)] text-[var(--text)]';
export const Hint = forward<{}, 'span'>((props) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="hint"
            className={props.className ?? hintClassName}
        />
    );
});

export const floatingHintClassName = clsx(hintClassName, floatingBottomClassName);
export const FloatingHint = forward<{}, 'span'>((props) => {
    return <Hint {...props} className={floatingHintClassName} />;
});

export const errorClassName =
    'text-[var(--text)] hidden peer-focus:text-[var(--text-focus)] group-data-[status=error]:block';
export const Error = forward<{ oneLine?: boolean }, 'span'>((props, ref) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="error"
            data-one-line={props.oneLine}
            ref={ref}
            className={props.className ?? errorClassName}
        />
    );
});

export const floatingErrorClassName = clsx(errorClassName, floatingBottomClassName);
export const FloatingError = forward<{}, 'span'>((props) => {
    return <Error {...props} className={floatingErrorClassName} />;
});

export const Bar = forward<{}, 'span'>((props) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="bar"
            className="before:h-px after:h-px before:bg-[var(--border-focus)] after:bg-[var(--border-focus)]"
        />
    );
});
