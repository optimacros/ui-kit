import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import React, { Component } from 'react';

import { ButtonComponent } from './Button';
import { mergeStyles } from '../../utils/mergeStyle';

// order of styles import is important
import themeStyle from './buttonTheme.module.css';
// eslint-disable-next-line
import style from './Button.module.css';
import { tw } from '../../utils';

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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    variant: 'primary' | 'accent' | 'bordered' | 'neutral';
    shape: 'raised' | 'floating' | 'flat';
    size: 'mini';
    fontColor: string;
    fontSize: string | number;
}

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

const buttonCn = tw`
leading-normal inline-flex items-center font-normal text-sm rounded-md border-1 border-solid border-transparent
normal-case data-uppercase:uppercase
`;

// export const Buttn = (props) => {
//     const { disabled, renderIcon, variant, size, shape, inverse } = props;

//     const buttonElement = React.createElement(
//         element,
//         {
//             ...props,
//             'data-variant': variant ?? 'neutral',
//             'data-size': size,
//             'data-shape': shape,
//             'data-inverse': inverse,
//             'data-recipe': 'Button',
//         },
//         renderIcon(),
//         label,
//         children,
//     );

//     if (disabled) {
//         return <span>{buttonElement}</span>;
//     }

//     return buttonElement;
// };
