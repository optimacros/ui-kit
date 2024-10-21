// @ts-nocheck
import React, { Component } from 'react'

import isComponentOfType from '../../../utils/react-toolbox-utils/is-component-of-type'
import { RadioProps } from '../../RadioButton/BaseRadioButton/Radio'

export interface RadioGroupProps {
    className?: string
    disabled?: boolean
    value?: string
    children?: React.ReactNode
    onChange?: (value: string | boolean, event: React.ChangeEvent) => void
    RadioButton?: React.FC<RadioProps>
    // eslint-disable-next-line react/no-unused-prop-types
    theme?: Record<string, string>
}

class RadioGroupComponent extends Component<RadioGroupProps> {
    static defaultProps = {
        className: '',
        disabled: false,
    }

    render() {
        return (
            <div className={this.props.className} data-react-toolbox="radio-group">
                {this.renderRadioButtons()}
            </div>
        )
    }

    renderRadioButtons() {
        const { children, RadioButton, value, disabled } = this.props

        return React.Children.map(children, (child) => {
            return !isComponentOfType(RadioButton, child)
                ? child
                : React.cloneElement(child, {
                      disabled: disabled || child.props.disabled,
                      checked: child.props.value === value,
                      onChange: this.handleChange.bind(this, child.props.value),
                  })
        })
    }

    handleChange = (value: string | boolean, event: React.ChangeEvent) => {
        if (this.props.onChange) {
            this.props.onChange(value, event)
        }
    }
}

export default RadioGroupComponent
