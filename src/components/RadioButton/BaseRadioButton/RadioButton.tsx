// @ts-nocheck
import classnames from 'classnames'
import React, { Component } from 'react'

import { RadioProps } from './Radio'

interface Props {
    Radio: React.FC<RadioProps>;
    checked?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string | React.ReactNode;
    tooltipOffset?: number;
    name?: string;
    onBlur?: () => void;
		onClick?: () => void;
    onChange?: (event: React.MouseEvent<HTMLInputElement>, scope: any) => void;
    onFocus?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    theme?: {
        disabled?: string;
        field?: string;
        input?: string;
        text?: string;
    };
    value?: string;
}

class RadioButtonComponent extends Component<Props> {
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
            className,
            disabled,
            label,
            tooltipOffset,
            name,
            onChange,
            onMouseEnter,
            onMouseLeave,
            onClick,
            theme,
            Radio,
            ...others
        } = this.props
        const _className = classnames(theme[this.props.disabled
            ? 'disabled'
            : 'field'], className)

        return (
            <label
                className={_className}
                data-react-toolbox="radio-button"
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
                    type="radio"
                    onChange={() => {}}
                    onClick={this.handleClick}
                />
                <Radio
                    checked={checked}
                    disabled={disabled}
                    theme={theme}
                />
                {label && <span className={theme.text}>{label}</span>}
                {children}
            </label>
        )
    }

    handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const { checked, disabled, onChange } = this.props

        if (event.pageX !== 0 && event.pageY !== 0) {
            this.blur()
        }

        if (!disabled && !checked && onChange) {
            onChange(event, this)
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

export default RadioButtonComponent
