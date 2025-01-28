import {
    type ButtonInitialProps,
    type ThemeButtonProps,
    Tooltip,
    TooltipProps,
    getVariant,
    getFloatStyles,
} from '@optimacros-ui/kit-internal';
import { IconButton as IconButtonCore } from '@optimacros-ui/icon-button';
import { Icon } from '@optimacros-ui/icon';

export type IconButtonTheme = ThemeButtonProps & { IconButton: string };

export interface Props extends Partial<ButtonInitialProps> {
    theme: Partial<IconButtonTheme>;
}

export type IconButtonProps = Partial<Props & TooltipProps>;

export interface IconBtnProps extends IconButtonProps {
    theme: IconButtonTheme & { toggle: string };
}

export const IconButton = ({
    children,
    label,
    theme,
    tooltip,
    tooltipDelay,
    tooltipPosition,
    tooltipOffset,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className,
    ...otherProps
}: IconButtonProps) => {
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
            className={className}
            tooltip={label ?? tooltip}
            tooltipDelay={tooltipDelay}
            tooltipPosition={tooltipPosition}
            tooltipOffset={tooltipOffset}
            theme={theme}
        >
            {children}
        </Tooltip>
    );
};

const IconButtonComponent = ({
    className = '',
    type = 'button',
    label,
    icon,
    href,
    theme,
    inverse,
    mini,
    neutral,
    uppercase,
    gray,
    warning,
    buttonColor,
    fontSize,
    fontColor,
    children,
    accent,
    primary,
    bordered,
    floating,
    raised,
    onMouseUp,
    onMouseLeave,
    disabled,
    ...rest
}: IconBtnProps) => {
    return (
        <IconButtonCore
            variant={getVariant(primary, accent, bordered, gray)}
            float={getFloatStyles(raised, floating)}
            status={warning ? 'warning' : null}
            href={href ? href : null}
            size={mini ? 'xs' : 'md'}
            disabled={disabled}
            inverse={inverse}
            uppercase={uppercase}
            {...rest}
        >
            {label}
            {icon && <Icon value={icon} />}
            {children}
        </IconButtonCore>
    );
};
