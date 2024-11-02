import classNames from 'classnames';
import React from 'react';

import { IconButtonComponent } from './IconButton';
import { mergeStyles } from '@optimacros/ui-kit-utils';
import type { ButtonInitialProps, ThemeButtonProps } from '../Button';
import { Tooltip, TooltipProps } from '../Tooltip';

// order of styles import is important
import themeStyle from './iconButtonTheme.module.css';
// eslint-disable-next-line
import style from './IconButton.module.css';

export type IconButtonTheme = ThemeButtonProps & { IconButton: string };

export interface Props extends Partial<ButtonInitialProps> {
    theme: Partial<IconButtonTheme>;
}

export type IconButtonProps = Partial<Props & TooltipProps>;

export class IconButton extends React.Component<IconButtonProps> {
    render(): React.JSX.Element {
        const {
            children,
            label,
            theme: customTheme,
            tooltip,
            tooltipDelay,
            tooltipPosition,
            tooltipOffset,
            onClick,
            onMouseEnter,
            onMouseLeave,
            className,
            ...otherProps
        } = this.props;

        let theme = mergeStyles(style, customTheme) as IconButtonTheme;
        theme = mergeStyles(theme, themeStyle) as IconButtonTheme;

        const updatedClassName = classNames(theme.IconButton, this.props.className);

        return (
            <Tooltip
                composedComponent={IconButtonComponent}
                composedComponentProps={{
                    ...otherProps,
                    'data-label': label,
                }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={updatedClassName}
                tooltip={this.props.label ?? this.props.tooltip}
                tooltipDelay={tooltipDelay}
                tooltipPosition={tooltipPosition}
                tooltipOffset={tooltipOffset}
                theme={theme}
            >
                {children}
            </Tooltip>
        );
    }
}
