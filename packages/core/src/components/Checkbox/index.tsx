import type { CSSProperties, MouseEventHandler } from 'react';
import React from 'react';

import { CheckboxComponent } from './Checkbox';
import { mergeStyles } from '@optimacros/ui-kit-utils';
import { Tooltip, TooltipProps, TooltipTheme } from '../Tooltip';

import themeStyle from './checkboxTheme.module.css';

export type Theme = {
    field?: string;
    text?: string;
    input?: string;
    check?: string;
    disabled?: string;
    checked?: string;
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

export class Checkbox extends React.Component<CheckboxProps> {
    render(): React.JSX.Element {
        const {
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
        } = this.props;

        const customTheme = mergeStyles(themeStyle, this.props.theme) as Required<Theme>;

        return tooltipLabel ? (
            <Tooltip
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={className}
                theme={customTheme}
                tooltip={tooltipLabel}
                tooltipDelay={tooltipDelay}
                tooltipPosition={tooltipPosition}
                tooltipOffset={tooltipOffset}
                composedComponent={CheckboxComponent}
                composedComponentProps={otherProps}
            />
        ) : (
            <CheckboxComponent
                {...otherProps}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={className}
                theme={customTheme}
            />
        );
    }
}
