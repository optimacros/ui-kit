import React from 'react'

import { mergeStyles } from '../../utils'
import { RadioButton as Base } from './BaseRadioButton'
import { RadioProps } from './BaseRadioButton/Radio'

import styles from './RadioButton.module.css'

export const RadioButton: React.FC<RadioProps> = props => {
    const { theme, label, placeholder, ...otherProps } = props
    const mixTheme = mergeStyles(theme, styles)

    return (
        <Base
            label={props.label || props.placeholder}
            theme={mixTheme}
            {...otherProps}
        />
    )
}

