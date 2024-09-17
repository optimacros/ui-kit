// @ts-nocheck
import classnames from 'classnames'
import React, { Component } from 'react'

import BaseCheck, { CheckProps } from './Check'
import { mergeStyles } from '../../utils'
import Ripple from '../WSRipple'

import themeStyles from './checkboxTheme.module.css'

interface Props {
    checked?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string;
    tooltipOffset?: number;
    name?: string;
    onClick?: () => void;
    onChange?: (value: boolean, event?: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    Check?: typeof BaseCheck;
    style?: any;
    theme?: Record<string, string> | Theme;
}

interface Theme {
    disabled?: string;
    field?: string;
    input?: string;
    ripple?: string;
}

class CheckboxComponent extends Component<Props> {
    static defaultProps = {
        checked: false,
        className: '',
        disabled: false,
    }

    inputNode: HTMLInputElement | null | undefined

    render() {
        const {
            checked,
            children,
            disabled,
            label,
            tooltipOffset,
            name,
            style,
            onChange,
            onMouseEnter,
            onMouseLeave,
            onClick,
            theme,
            Check,
            ...others
        } = this.props

        const className = classnames(
            theme.field,
            {
                [theme.disabled]: this.props.disabled,
            },
            this.props.className,
        )

        return (
            <label
                className={className}
                data-react-toolbox="checkbox"
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <input
                    {...others}
                    ref={node => {
                        this.inputNode = node
                    }}
                    checked={checked}
                    className={theme.input}
                    disabled={disabled}
                    name={name}
                    type="checkbox"
                    onChange={() => {}}
                    onClick={this.handleToggle}
                />

                {Check
                    && React.createElement(Check, {
                        checked,
                        disabled,
                        rippleClassName: theme.ripple,
                        style,
                        theme,
                    })}

                {label && (
                    <span
                        className={theme.text}
                        data-react-toolbox="label"
                    >
                        {label}
                    </span>
                )}

                {children}
            </label>
        )
    }

    handleToggle = (event: React.MouseEvent) => {
        if (event.pageX !== 0 && event.pageY !== 0) {
            this.blur()
        }

        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(!this.props.checked, event)
        }
    }

    blur() {
        if (this.inputNode) {
            this.inputNode.blur()
        }
    }

    focus() {
        if (this.inputNode) {
            this.inputNode.focus()
        }
    }
}

const ThemedCheck: React.FC<CheckProps> = ({ children, ...props }) => (
    <Ripple
        rippleSpread={2.6}
        rippleCentered
        {...props}
    >
        <BaseCheck {...props}>{children}</BaseCheck>
    </Ripple>
)
const Checkbox: React.FC<CheckProps> = props => (
    <CheckboxComponent
        {...props}
        Check={ThemedCheck}
    />
)
const ThemedCheckbox: React.FC<CheckProps> = props => (
    <Checkbox
        {...props}
        theme={props.theme
            ? mergeStyles(props.theme, themeStyles)
            : themeStyles}
    />
)

export default ThemedCheckbox
export { ThemedCheckbox as Checkbox }
export { ThemedCheck as Check }
