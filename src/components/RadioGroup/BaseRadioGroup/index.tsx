import React from 'react'
import { RadioButton } from 'ui-kit-core'

import RadioGroupComponent, { RadioGroupProps } from './RadioGroup'
import { mergeStyles } from '../../../utils'

import theme from './radioGroupTheme.module.css'

const RadioGroup: React.FC<RadioGroupProps> = (props) => (
    <RadioGroupComponent
        {...props}
        RadioButton={RadioButton}
        theme={props.theme ? mergeStyles(props.theme, theme) : theme}
    />
)

export { RadioGroup }
