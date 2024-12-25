import type { ReactNode } from 'react';

import { forward, styled } from '@optimacros-ui/store';

export interface ButtonThemeProps {
    variant?: 'primary' | 'accent' | 'bordered' | 'neutral' | 'transparent' | 'gray';
    float?: 'raised' | 'floating' | 'flat';
    status?: 'warning' | 'error' | 'success';
    size?: 'xs' | 'sm' | 'md';
    squared?: boolean;
    uppercase?: boolean;
    inverse?: boolean;
}

export interface ButtonProps extends ButtonThemeProps {
    disabled?: boolean;
    className?: string;
    href?: string;
    target?: string;
    children?: ReactNode;
}

export const Button = forward<ButtonProps, 'button'>((props: ButtonProps, ref) => {
    const {
        disabled,
        variant,
        size,
        float,
        inverse,
        status,
        href,
        children,
        uppercase,
        squared,
        ...rest
    } = props;

    const elementProps = {
        ...rest,
        ref,
        disabled,
        'data-variant': variant ?? 'neutral',
        'data-size': size ?? 'md',
        'data-float': float ?? 'flat',
        'data-inverse': inverse,
        'data-scope': 'button',
        'data-part': 'root',
        'data-uppercase': uppercase,
        'data-status': status,
        'data-squared': squared,
        'data-tag': props['data-tag'] ?? 'button',
        children,
    };

    //@ts-ignore
    return href ? <styled.a href={href} {...elementProps} /> : <styled.button {...elementProps} />;
});
