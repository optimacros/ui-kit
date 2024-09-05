import React from 'react'

import RadioGroupComponent, { RadioGroupProps } from './RadioGroup'
import { mergeStyles } from '../../../utils'
import { RadioButton } from '../../RadioButton'

import theme from './radioGroupTheme.module.css'

const RadioGroup: React.FC<RadioGroupProps> = props => (
    <RadioGroupComponent
        {...props}
        RadioButton={RadioButton}
        theme={props.theme
            ? mergeStyles(props.theme, theme)
            : theme}
    />
)

export { RadioGroup }
