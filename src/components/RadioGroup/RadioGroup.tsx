import classNames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'

import { RadioGroup as Base } from './BaseRadioGroup'
import { RadioButton } from '../RadioButton'

interface Props {
    options?: any[];
    classNameButton?: string;
    children?: React.ReactNode;
    theme?: Record<string, string>;
}

export class RadioGroup extends Component<Props> {
    render() {
        const { options, classNameButton, children, ...otherProps } = this.props

        return (
            <Base {...otherProps}>
                {children}
                {this.renderElements()}
            </Base>
        )
    }

    renderElements() {
        const { options, theme, classNameButton } = this.props

        return _.map(options, (option, key) => {
            const className = classNames(option.className, classNameButton)

            return (
                <RadioButton
                    {...option}
                    key={key}
                    className={className}
                    theme={theme}
                />
            )
        })
    }
}
