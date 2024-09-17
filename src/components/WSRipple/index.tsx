import React from 'react'

import RippledComponent, { RippleProps } from './Ripple'
import { mergeStyles } from '../../utils'

import theme from './rippleTheme.module.css'

const Ripple: React.FC<RippleProps> = props => {
    return (
        <RippledComponent
            {...props}
            theme={mergeStyles(props.theme, theme)}
        />
    )
}

export default Ripple
