import React, { MouseEvent, type CSSProperties, type MouseEventHandler } from 'react';
import { Tooltip } from '@optimacros-ui/tooltip';
import { Checkbox as CheckboxCore } from '@optimacros-ui/checkbox';

export interface CheckboxComponentProps extends InitialProps {
    theme: Required<Theme>;
}

export type Theme = {
    field?: string;
    text?: string;
    input?: string;
    check?: string;
    disabled?: string;
    checked?: string;
};

export type TooltipTheme = {
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

export type TooltipProps = {
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

export type InitialProps = {
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
    theme?: Partial<Theme> & Partial<TooltipTheme>;
} & Partial<TooltipProps>;

export type CheckboxProps = React.PropsWithChildren<InitialProps>;

export const Checkbox: CheckboxProps = ({
    tooltipLabel,
    theme,
    tooltipDelay,
    tooltipPosition,
    tooltipOffset,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className,
    ...otherProps
}) => {
    return tooltipLabel ? (
        //TODO: need to use internal tooltip
        <Tooltip.Root
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            openDelay={tooltipDelay}
            positioning={{
                placement: tooltipPosition,
                offset: {
                    crossAxis: tooltipOffset,
                    mainAxis: tooltipOffset,
                },
            }}
        >
            <Tooltip.Trigger as="div">
                <CheckboxComponent
                    {...otherProps}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Tooltip.Trigger>
            <Tooltip.Content>{tooltipLabel}</Tooltip.Content>
        </Tooltip.Root>
    ) : (
        <CheckboxComponent
            {...otherProps}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
};

const CheckboxComponent: React.PropsWithChildren<CheckboxComponentProps> = ({
    checked = false,
    children,
    disabled = false,
    label,
    name,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onClick,
    ...others
}) => {
    const handleToggle = (event: MouseEvent) => {
        if (onChange && !disabled) {
            onChange(!checked, event);
        }
    };

    return (
        <CheckboxCore.Root name={name} checked={checked} disabled={disabled} {...others}>
            <CheckboxCore.BoxControl
                onClick={handleToggle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            {label && <CheckboxCore.Label>{label}</CheckboxCore.Label>}
            {children}
        </CheckboxCore.Root>
    );
};
