import React, { useRef, MouseEvent, type CSSProperties, type MouseEventHandler } from 'react';
import { Tooltip } from '@optimacros-ui/tooltip';
import { Checkbox as CheckboxComponent } from '@optimacros-ui/checkbox';

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
            <Tooltip.Trigger asChild>
                <div>
                    <CheckboxWrapper
                        {...otherProps}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                </div>
            </Tooltip.Trigger>
            <Tooltip.Content>{tooltipLabel}</Tooltip.Content>
        </Tooltip.Root>
    ) : (
        <CheckboxWrapper
            {...otherProps}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
};

const CheckboxWrapper: React.PropsWithChildren<CheckboxComponentProps> = ({
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
    const inputNode = useRef<HTMLInputElement>(null);

    const handleToggle = (event: MouseEvent) => {
        if (event.pageX !== 0 && event.pageY !== 0) {
            blur();
        }

        if (onChange && !disabled) {
            onChange(!checked, event);
        }
    };

    const blur = () => {
        if (inputNode.current) {
            inputNode.current.blur();
        }
    };

    return (
        <CheckboxComponent.Root name={name} checked={checked} disabled={disabled} {...others}>
            <CheckboxComponent.BoxControl
                ref={inputNode}
                onClick={handleToggle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            {label && <CheckboxComponent.Label>{label}</CheckboxComponent.Label>}
            {children}
        </CheckboxComponent.Root>
    );
};
