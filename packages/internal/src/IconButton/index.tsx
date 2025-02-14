import {
    type ButtonInitialProps,
    type ThemeButtonProps,
    Tooltip,
    TooltipProps,
    getVariant,
    getFloatStyles,
} from '@optimacros-ui/kit-internal';
import { IconButton as IconButtonCore } from '@optimacros-ui/icon-button';
import { forward } from '@optimacros-ui/store';
import { useThemeClassName } from '../utils';

export type IconButtonTheme = ThemeButtonProps & { IconButton: string };

interface Props extends Partial<ButtonInitialProps> {
    theme: Partial<IconButtonTheme>;
}

export type IconButtonProps = Partial<Props & TooltipProps>;

export interface IconBtnProps extends IconButtonProps {
    theme?: IconButtonTheme & { toggle: string };
}

const IconButtonComponent = forward<IconBtnProps, 'button'>(
    (
        {
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
            disabled,
            ...rest
        },
        ref,
    ) => {
        const style = {
            backgroundColor: buttonColor,
            color: fontColor,
            fontSize,
        };

        const cn = useThemeClassName(theme, className);

        return (
            <IconButtonCore
                variant={getVariant(primary, accent, bordered, gray, neutral)}
                float={getFloatStyles(raised, floating)}
                status={warning ? 'warning' : null}
                href={href ? href : null}
                size={mini ? 'xs' : 'md'}
                disabled={disabled}
                inverse={inverse}
                uppercase={uppercase}
                icon={icon}
                style={style}
                className={cn}
                {...rest}
                ref={ref}
            />
        );
    },
);

export const IconButton = forward<IconButtonProps, 'button'>(
    (
        {
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
        },
        ref,
    ) => {
        return (
            <Tooltip
                composedComponent={IconButtonComponent}
                composedComponentProps={{
                    ...otherProps,
                    ref,
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
    },
);
