import {
    Button,
    type ButtonInitialProps,
    type ThemeButtonProps,
    Tooltip,
    TooltipProps,
} from '@optimacros-ui/kit-internal';

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
            composedComponent={Button}
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
