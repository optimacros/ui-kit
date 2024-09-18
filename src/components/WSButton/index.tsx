import classNames from 'classnames'
import React from 'react'

import { Button as Base, ThemeProps } from './BaseButton'
import { mergeStyles } from '../../utils'

import styles from './Button.module.css'

interface Theme extends ThemeProps {
    Button: string;
    button_uppercase: string;
    gray: string;
    warning: string;
}

interface Props {
    theme?: Theme;
    className?: string;
    accent?: boolean;
    gray?: boolean;
    warning?: boolean;
    uppercase?: boolean;
    buttonColor?: string;
    fontColor?: string;
    fontSize?: string | number;
    label?: string;
    tooltip?: string;
    onClick?: () => void;
    type?: string;
}

export class WSButton extends React.PureComponent<Props> {
    render() {
        const {
            tooltip,
            gray,
            warning,
            buttonColor,
            fontSize,
            fontColor,
            uppercase,
            ...otherProps
        } = this.props
        const theme = mergeStyles(otherProps.theme, styles) as Theme
        const className = classNames(
            this.props.className,
            {
                [theme.button_uppercase]: uppercase,
                [theme.gray]: gray,
                [theme.warning]: warning,
            },
            theme.Button,
        )

        return (
            <Base
                {...otherProps}
                className={className}
                style={{
                    backgroundColor: buttonColor,
                    color: fontColor,
                    fontSize,
                }}
                theme={theme}
            />
        )
    }
}
