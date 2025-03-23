import { ComponentProps } from 'react';
import type React from 'react';
import { Button as ButtonComponent, type ButtonProps } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';
import { forward } from '@optimacros-ui/store';
import { useThemeClassName } from '../utils';
import './styles.css';

export type ThemeButtonProps = {
    button: string;
    icon: string;
    accent: string;
    bordered: string;
    neutral: string;
    primary: string;
    flat: string;
    floating: string;
    raised: string;
    inverse: string;
    mini: string;
};

export type ButtonTheme = ThemeButtonProps & {
    Button: string;
    button_uppercase: string;
    gray: string;
    warning: string;
};

export interface ButtonInitialProps extends ButtonProps {
    label: string;
    icon: string | React.JSX.Element | null;
    iconPosition?: 'left' | 'right';
    href: string;
    target: string;
    gray: boolean;
    warning: boolean;
    accent: boolean;
    neutral: boolean;
    primary: boolean;
    bordered: boolean;
    uppercase: boolean;
    floating: boolean;
    raised: boolean;
    inverse: boolean;
    mini: boolean;
    buttonColor: string;
    fontColor: string;
    fontSize: string | number;
    theme?: Partial<ThemeButtonProps>;
}

export const getVariant = (
    primary: boolean,
    accent: boolean,
    bordered: boolean,
    gray: boolean,
    neutral: boolean,
): 'primary' | 'accent' | 'bordered' | 'gray' | 'neutral' => {
    switch (true) {
        case primary:
            return 'primary';
        case accent:
            return 'accent';
        case bordered:
            return 'bordered';
        case gray:
            return 'gray';
        case neutral:
            return 'neutral';
        default:
            return 'neutral';
    }
};

export const getFloatStyles = (
    raised: boolean,
    floating: boolean,
): 'raised' | 'floating' | 'flat' => {
    switch (true) {
        case raised:
            return 'raised';
        case floating:
            return 'floating';
        default:
            return 'flat';
    }
};

export const Button = forward<
    Partial<ButtonInitialProps> & {
        theme?: Partial<ButtonTheme>;
    },
    'button'
>(
    (
        {
            type = 'button',
            label,
            icon,
            iconPosition = 'left',
            href,
            theme = {},
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
            className,
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

        const btnContentDirection = iconPosition === 'left' ? 'row' : 'row-reverse';

        return (
            <ButtonComponent
                data-tag="btn-internal"
                variant={getVariant(primary, accent, bordered, gray, neutral)}
                float={getFloatStyles(raised, floating)}
                status={warning ? 'error' : null}
                href={href ? href : null}
                size={mini ? 'xs' : 'md'}
                disabled={disabled}
                inverse={inverse}
                uppercase={uppercase}
                style={style}
                ref={ref}
                type={type}
                className={cn}
                {...rest}
            >
                {icon ? (
                    <Flex direction={btnContentDirection} align="center" gap={2}>
                        <Icon value={icon} />
                        {label}
                    </Flex>
                ) : (
                    label
                )}
                {children}
            </ButtonComponent>
        );
    },
);

export type ButtonComponentProps = ComponentProps<typeof Button>;
