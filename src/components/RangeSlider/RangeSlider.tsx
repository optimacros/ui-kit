// @ts-nocheck
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { Range } from 'react-range'
import { getStepDecimals } from 'react-range/lib/utils'

import { colorUtils } from '../../utils'

import styles from './RangeSlider.module.css'

const STEP = 0.01
const MIN = 0
const MAX = 100

interface Props {
    step: number;
    min: number;
    max: number;
    values: Array<number>;
    customValues: Array<number>;
    rangeValues: Array<number>;
    color: string;
    classNameTrack: string;
    hasRangeValues: boolean;
    designTheme: () => any;
    onChange: () => void;
    onFinalChange: () => void;
}

@observer
export class RangeSlider extends React.Component<Props> {
    _rangeValuesItemRef = React.createRef()

    state = { width: 0 }

    componentDidMount() {
        this._setThumbInnerWidth()
    }

    componentDidUpdate() {
        this._setThumbInnerWidth()
    }

    render() {
        return (
            <Range
                values={this._values}
                step={this._step}
                min={this._min}
                max={this._max}
                onChange={(values) => this._onChange(values)}
                onFinalChange={(values) => this._onFinalChange(values)}
                renderTrack={this.renderTrack}
                renderThumb={this.renderThumb}
            />
        )
    }

    renderTrack = ({ props, children }) => {
        const { classNameTrack } = this.props
        const className = classNames(styles.Track, classNameTrack)

        return (
            <div
                className={className}
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{ ...props.style }}
            >
                <div
                    className={styles.TrackInner}
                    ref={props.ref}
                >
                    {this.renderRangeValues()}
                    {children}
                </div>
            </div>
        )
    }

    renderRangeValues = () => {
        const { rangeValues: customRangeValues } = this.props

        const defaultRangeValues = [
            `${this._getFixedByStepDecimals(this._values[0])}%`,
            `${this._getFixedByStepDecimals(this._values[1] - this._values[0])}%`,
            `${this._getFixedByStepDecimals(this._max - this._values[1])}%`,
        ]

        const leftRangeStyle = {
            width: `${defaultRangeValues[0]}`,
        }
        const middleRangeStyle = {
            width: `${defaultRangeValues[1]}`,
            left: `${this._values[0]}%`,
            background: this._color,
            color: colorUtils.toColorContrast(this._color),
        }
        const rightRangeStyle = {
            width: `${defaultRangeValues[2]}`,
            left: `${this._values[1]}%`,
        }

        const rangeValues = customRangeValues || defaultRangeValues

        return (
            <div className={styles.RangeValues}>
                {this.renderRangeValuesItem(leftRangeStyle, rangeValues[0])}
                {this.renderRangeValuesItem(middleRangeStyle, rangeValues[1], this._rangeValuesItemRef)}
                {this.renderRangeValuesItem(rightRangeStyle, rangeValues[2])}
            </div>
        )
    }

    renderRangeValuesItem(style, value, ref) {
        return (
            <div
                className={styles.RangeValuesItem}
                style={style}
                ref={ref}
            >
                {this.props.hasRangeValues && value}
            </div>
        )
    }

    renderThumb = ({ index, props, isDragged }) => {
        const values = this.props.customValues || this._values

        const className = classNames({
            [styles.Thumb]: true,
            [styles.Thumb_isDragged]: isDragged,
        })

        const classNameThumbInner = classNames({
            [styles.ThumbInner]: true,
            [styles.ThumbInner_left]: !index,
            [styles.ThumbInner_right]: index,
        })

        const styleThumbInner = {
            background: this._color,
            color: colorUtils.toColorContrast(this._color),
            maxWidth: this.state.width,
        }

        return (
            <div
                {...props}
                className={className}
                style={{ ...props.style }}
            >
                <div
                    className={classNameThumbInner}
                    style={styleThumbInner}
                >
                    {values[index]}
                </div>

                <div
                    className={styles.ThumbKnob}
                    style={styleThumbInner}
                />
            </div>
        )
    }

    _onChange = (values) => {
        if (this.props.onChange) {
            this.props.onChange(values)
        }
    }

    _onFinalChange = (values) => {
        this._onChange(values)

        if (this.props.onFinalChange) {
            this.props.onFinalChange(values)
        }
    }

    _getFixedByStepDecimals(number) {
        return number.toFixed(this._stepDecimals)
    }

    _setThumbInnerWidth() {
        if (!this._rangeValuesItemRef || !this._rangeValuesItemRef.current) {
            return
        }

        const node = this._rangeValuesItemRef.current
        const { width } = node.getBoundingClientRect()

        if (width !== this.state.width) {
            this.setState({ width })
        }
    }

    get _stepDecimals() {
        return getStepDecimals(this._step)
    }

    get _color() {
        const { color, designTheme } = this.props

        return color || designTheme().colors['--primary-color']
    }

    get _min() {
        return this.props.min || MIN
    }

    get _max() {
        return this.props.max || MAX
    }

    get _step() {
        return this.props.step || STEP
    }

    get _values() {
        return this.props.values || [this._min, this._max]
    }
}
