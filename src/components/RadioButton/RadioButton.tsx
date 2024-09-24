import React from 'react'

import { RadioButton as Base } from './BaseRadioButton'
import { RadioProps } from './BaseRadioButton/Radio'
import { mergeStyles } from '../../utils'

import baseTheme from './BaseRadioButton/radioButtonTheme.module.css'
import styles from './RadioButton.module.css'

export const RadioButton: React.FC<RadioProps> = props => {
    const { theme, label, placeholder, ...otherProps } = props
    const mixTheme = mergeStyles(theme, styles)

    return (
        <Base
            label={props.label || props.placeholder}
            theme={mergeStyles(baseTheme, mixTheme)}
            {...otherProps}
        />
    )
}

