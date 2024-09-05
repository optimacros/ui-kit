import React from 'react'

import Radio, { RadioProps } from './Radio'
import RadioButtonComponent from './RadioButton'
import { mergeStyles } from '../../../utils'

import theme from './radioButtonTheme.module.css'

const RadioButton: React.FC<RadioProps> = props => (
    <RadioButtonComponent
        {...props}
        Radio={Radio}
        theme={props.theme
            ? mergeStyles(props.theme, theme)
            : theme}
    />
)

export default RadioButton
export { RadioButton }
