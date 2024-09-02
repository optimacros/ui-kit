import React from 'react'
import { mergeStyles } from 'ui-kit-core'
import ThemedSlider, { SliderProps } from './Slider'

import styles from './SliderScale.module.css'

interface SliderScaleProps extends SliderProps {
    label?: string;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class SliderScale extends React.Component<SliderScaleProps> {
    render() {
        const { label, ...otherProps } = this.props
        const theme = mergeStyles(this.props.theme, styles)

        return (
            <div className={theme.SliderScale}>
                {label && <span className={theme.Title}>{label}</span>}

                <ThemedSlider
                    {...otherProps}
                    theme={theme}
                />
            </div>
        )
    }
}
