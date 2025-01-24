import React, { type ButtonHTMLAttributes } from 'react';
import { Button as ButtonComponent } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';

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

export interface ButtonInitialProps
    extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    label: string;
    icon: string | React.JSX.Element | null;
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
    theme: Partial<ThemeButtonProps>;
}

export interface ButtonComponentProps extends Partial<ButtonInitialProps> {
    theme: ButtonTheme;
}

const getVariant = (
    primary: boolean,
    accent: boolean,
    bordered: boolean,
    gray: boolean,
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
        default:
            return 'neutral';
    }
};

const getFloatStyles = (raised: boolean, floating: boolean): 'raised' | 'floating' | 'flat' => {
    switch (true) {
        case raised:
            return 'raised';
        case floating:
            return 'floating';
        default:
            return 'flat';
    }
};

export const Button = ({
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
}: ButtonComponentProps) => {
    return (
        <ButtonComponent
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
        </ButtonComponent>
    );
};
