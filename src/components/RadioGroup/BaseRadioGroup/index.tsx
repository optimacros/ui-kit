import React from 'react'

import { mergeStyles } from '../../../utils'
import { RadioButton } from '../../RadioButton'
import RadioGroupComponent, { RadioGroupProps } from './RadioGroup'

import theme from './radioGroupTheme.module.css'

const RadioGroup: React.FC<RadioGroupProps> = props => (
    <RadioGroupComponent
        {...props}
				RadioButton={RadioButton}
        theme={props.theme ? mergeStyles(props.theme, theme) : theme}
    />
)

export { RadioGroup }
