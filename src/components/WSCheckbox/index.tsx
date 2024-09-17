// @ts-nocheck
import React from 'react'
import { Tooltip } from 'ui-kit-core'

import { Checkbox as Base } from './Checkbox'
import { mergeStyles } from '../../utils'

import styles from './Checkbox.module.css'

interface Props {
    label?: string;
    checked?: boolean;
    placeholder?: string;
    value?: string;
    tooltipLabel?: string;
    theme?: Record<string, string>;
    onChange?: (value: string) => void;
    children?: React.ReactNode;
}

// eslint-disable-next-line react/prefer-stateless-function
export class WSCheckbox extends React.Component<Props> {
    render() {
        const { label, placeholder, value, tooltipLabel, theme, ...otherProps } = this.props

        return tooltipLabel
            ? (
                <Tooltip
                    checked={!!value}
                    composedComponent={Base}
                    label={label || placeholder}
                    theme={mergeStyles(theme, styles)}
                    tooltip={tooltipLabel}
                    {...otherProps}
                />
            )
            : (
                <Base
                    checked={!!value}
                    label={label || placeholder}
                    theme={mergeStyles(theme, styles)}
                    tooltip={tooltipLabel}
                    name={label}
                    {...otherProps}
                />
            )
    }
}
