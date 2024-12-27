import classnames from 'classnames';
import React, { MouseEvent, useRef } from 'react';
import { TooltipProps } from '../Tooltip';
import type { ButtonInitialProps, ThemeButtonProps } from '@optimacros-ui/kit-legacy';
import { FontIcon } from '../FontIcon';

export type IconButtonTheme = ThemeButtonProps & { IconButton: string };

export interface Props extends Partial<ButtonInitialProps> {
    theme: Partial<IconButtonTheme>;
}

export type IconButtonProps = Partial<Props & TooltipProps>;

export interface IconBtnProps extends IconButtonProps {
    theme: IconButtonTheme & { toggle: string };
}

export const IconButton: IconBtnProps = ({
    inverse = false,
    neutral = true,
    disabled = false,
    type = 'button',
    accent,
    children,
    className = '',
    href,
    icon,
    primary,
    theme,
    bordered,
    onMouseUp,
    onMouseLeave,
    ...others
}) => {
    const buttonNode = useRef<HTMLButtonElement>(null);

    const getLevel = (): 'primary' | 'accent' | 'bordered' | 'neutral' => {
        if (primary) {
            return 'primary';
        }

        if (accent) {
            return 'accent';
        }

        if (bordered) {
            return 'bordered';
        }

        return 'neutral';
    };

    const handleMouseUp = (event: MouseEvent<HTMLButtonElement>): void => {
        buttonNode.current?.blur();

        if (onMouseUp) {
            onMouseUp(event);
        }
    };

    const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>): void => {
        buttonNode.current?.blur();

        if (onMouseLeave) {
            onMouseLeave(event);
        }
    };

    const element = href ? 'a' : 'button';
    const level = getLevel();
    const classes = classnames(
        [theme.toggle],
        {
            [theme[level]]: neutral,
            [theme.inverse]: inverse,
        },
        className,
    );

    const props = {
        ...others,
        href,
        ref: buttonNode,
        className: classes,
        disabled: disabled,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        type: !href ? type : undefined,
        'data-react-toolbox': 'button',
    };

    const iconElement =
        typeof icon === 'string' ? <FontIcon className={theme.icon} value={icon} /> : icon;

    return React.createElement(element, props, icon && iconElement, children);

    // return (
    //     <Tooltip
    //         composedComponent={IconButtonComponent}
    //         composedComponentProps={{
    //             ...otherProps,
    //             'data-label': label,
    //         }}
    //         onClick={onClick}
    //         onMouseEnter={onMouseEnter}
    //         onMouseLeave={onMouseLeave}
    //         className={updatedClassName}
    //         tooltip={this.props.label ?? this.props.tooltip}
    //         tooltipDelay={tooltipDelay}
    //         tooltipPosition={tooltipPosition}
    //         tooltipOffset={tooltipOffset}
    //         theme={theme}
    //     >
    //         {children}
    //     </Tooltip>
    // );
};
