import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import React, { Component } from 'react';

import { ButtonComponent } from './Button';
import { mergeStyles } from '../../utils/mergeStyle';

// order of styles import is important
import themeStyle from './buttonTheme.module.css';
// eslint-disable-next-line
import style from './Button.module.css';

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

export type ButtonProps = Partial<ButtonInitialProps>;

export class Button extends Component<ButtonProps> {
    render(): React.JSX.Element {
        let theme = mergeStyles(style, this.props.theme) as ButtonTheme;
        theme = mergeStyles(theme, themeStyle) as ButtonTheme;

        const className = classNames(
            this.props.className,
            {
                [theme.button_uppercase]: this.props.uppercase ?? false,
                [theme.gray]: this.props.gray ?? false,
                [theme.warning]: this.props.warning ?? false,
            },
            theme.Button,
        );

        return <ButtonComponent {...this.props} className={className} theme={theme} />;
    }
}
