import { forwardRef, type CSSProperties, type MouseEventHandler } from 'react';
import type React from 'react';
import { forward } from '@optimacros-ui/store';
import { Tooltip } from '@optimacros-ui/kit-internal';
import { Checkbox as CheckboxCore } from '@optimacros-ui/checkbox';
import { clsx, isUndefined } from '@optimacros-ui/utils';

import './style.css';

export type CheckboxTheme = {
    field?: string;
    text?: string;
    input?: string;
    check?: string;
    disabled?: string;
    checked?: string;
};

export type CheckboxTooltipTheme = {
    tooltip: string;
    tooltipActive: string;
};

const POSITION = {
    BOTTOM: 'bottom',
    HORIZONTAL: 'horizontal',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    VERTICAL: 'vertical',
} as const;

export type Position = (typeof POSITION)[keyof typeof POSITION];

export type CheckboxTooltipProps = {
    composedComponent: string | React.FunctionComponent<any> | React.ComponentClass<any>;
    composedComponentProps?: Record<string, any>;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    theme?: Record<string, string>;
    tooltip?: string | React.ReactNode;
    tooltipDelay?: number;
    tooltipPosition?: Position;
    tooltipOffset?: number;
};

type InitialProps = {
    checked?: boolean;
    value?: boolean;
    name?: string;
    label?: React.ReactNode | string;
    tooltipLabel?: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: (checked: boolean, event: React.MouseEvent) => void;
    onMouseEnter?: MouseEventHandler<HTMLLabelElement> | undefined;
    onMouseLeave?: MouseEventHandler<HTMLLabelElement> | undefined;
    theme?: Partial<CheckboxTheme> & Partial<CheckboxTooltipTheme>;
} & Partial<CheckboxTooltipProps>;

export type CheckboxProps = React.PropsWithChildren<InitialProps>;

export const Checkbox = forward<CheckboxProps, HTMLInputElement>(
    (
        {
            tooltipLabel,
            theme = {},
            tooltipDelay,
            tooltipPosition,
            tooltipOffset,
            onClick,
            onMouseEnter,
            onMouseLeave,
            className,
            ...rest
        },
        ref,
    ) => {
        return tooltipLabel ? (
            <Tooltip
                className={className}
                theme={theme}
                tooltip={tooltipLabel}
                tooltipDelay={tooltipDelay}
                tooltipPosition={tooltipPosition}
                tooltipOffset={tooltipOffset}
                composedComponent={CheckboxComponent}
                composedComponentProps={{
                    ...rest,
                    onClick,
                    onMouseEnter,
                    onMouseLeave,
                }}
            />
        ) : (
            <CheckboxComponent
                {...rest}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={className}
                theme={theme}
                ref={ref}
            />
        );
    },
);

Checkbox.displayName = 'Checkbox';

const CheckboxComponent = forward<React.PropsWithChildren<InitialProps>, HTMLInputElement>(
    (
        {
            checked = false,
            value = false,
            children,
            disabled = false,
            label,
            name,
            onChange,
            onMouseEnter,
            onMouseLeave,
            onClick,
            theme = {},
            ...rest
        },
        ref,
    ) => {
        return (
            <CheckboxCore.Root
                name={name}
                defaultChecked={checked}
                checked={isUndefined(onChange) ? undefined : checked || value}
                disabled={disabled}
                //@ts-ignore
                onCheckedChange={(e) => onChange?.(e.checked, {})}
                className={theme.field}
                data-react-toolbox="checkbox"
                data-style-tag="internal"
                {...rest}
            >
                <CheckboxContent
                    label={label}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    theme={theme}
                >
                    {children}
                </CheckboxContent>
            </CheckboxCore.Root>
        );
    },
);

CheckboxComponent.displayName = 'CheckboxComponent';

const CheckboxContent = forwardRef<
    HTMLInputElement,
    React.PropsWithChildren<Partial<InitialProps>>
>(({ children, label, onMouseEnter, onMouseLeave, theme }, ref) => {
    const api = CheckboxCore.useApi();

    const boxCN = clsx({
        [theme.input]: !!theme.input,
        'checkboxTheme-module__checked': api.checked,
    });

    return (
        <>
            <CheckboxCore.BoxControl
                className={boxCN}
                ref={ref}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            {label && (
                <CheckboxCore.Label className={theme.text} data-react-toolbox="label">
                    {label}
                </CheckboxCore.Label>
            )}
            {children}
        </>
    );
});

CheckboxContent.displayName = 'CheckboxContent';
