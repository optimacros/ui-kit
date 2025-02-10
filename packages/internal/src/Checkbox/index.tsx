import React, { type CSSProperties, type MouseEventHandler } from 'react';
import { forward } from '@optimacros-ui/store';
import { Tooltip } from '@optimacros-ui/kit-internal';
import { Checkbox as CheckboxCore } from '@optimacros-ui/checkbox';
import { isUndefined } from '@optimacros-ui/utils';

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
            theme,
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

const CheckboxComponent = forward<React.PropsWithChildren<InitialProps>, HTMLInputElement>(
    (
        {
            checked = false,
            children,
            disabled = false,
            label,
            name,
            onChange,
            onMouseEnter,
            onMouseLeave,
            onClick,
            theme,
            ...rest
        },
        ref,
    ) => {
        return (
            <CheckboxCore.Root
                name={name}
                checked={checked}
                disabled={disabled}
                //@ts-ignore
                onCheckedChange={(e) => onChange?.(e.checked, {})}
                //TODO: think how to handle controllable use case without using flag outside
                controllable={!isUndefined(onChange)}
                className={theme.field}
                {...rest}
            >
                <CheckboxCore.BoxControl
                    className={theme.input}
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
                {label && <CheckboxCore.Label className={theme.text}>{label}</CheckboxCore.Label>}
                {children}
            </CheckboxCore.Root>
        );
    },
);
