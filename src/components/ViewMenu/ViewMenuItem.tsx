// @ts-nocheck
import classNames from 'classnames'
import React from 'react'

import { OFFSET_STEP } from './constants'

import styles from './ViewMenu.module.css'

export default class ViewMenuItem extends React.PureComponent {
    render() {
        const { label, active, offset, disabled } = this.props
        const className = classNames({
            [styles.Element]: true,
            [styles.Element__selected]: active,
            [styles.Element__disabled]: disabled,
        })

        const step = OFFSET_STEP

        const style = {
            marginLeft: offset * step,
        }

        return (
            <div
                className={className}
                style={style}
                onClick={this._onClick}
            >
                {label}
            </div>
        )
    }

    _onClick = () => this.props.onClick()
}
