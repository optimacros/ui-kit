import React from 'react'

import Radio, { RadioProps } from './Radio'
import RadioButtonComponent from './RadioButton'

const RadioButton: React.FC<RadioProps> = props => (
    // @ts-ignore
    <RadioButtonComponent
        {...props}
        Radio={Radio}
    />
)

export default RadioButton
export { RadioButton }
