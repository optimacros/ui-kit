// @ts-nocheck
/* eslint-disable multiline-ternary */
import _ from 'lodash'
import React from 'react'
import { CustomPicker } from 'react-color'
import { Saturation, EditableInput, Hue, Alpha } from 'react-color/lib/components/common'
import tinyColor from 'tinycolor2'

import style from './CustomPicker.module.css'

const inputStyles = {
    hex: {
        input: {
            textAlign: 'center',
            width: '70px',
            border: 'none',
            boxShadow: 'rgb(204, 204, 204) 0px 0px 0px 1px inset',
            padding: '4px',
        },
    },
    rgb: {
        input: {
            textAlign: 'center',
            width: '30px',
            border: 'none',
            boxShadow: 'rgb(204, 204, 204) 0px 0px 0px 1px inset',
            padding: '4px',
        },
    },
}

const CustomSlider = () => {
    return <div className={style.slider} />
}

const CustomPointer = () => {
    return <div className={style.pointer} />
}

export const toState = (data, oldHue: number): ColorState => {
    const color = data.hex
        ? tinyColor(data.hex)
        : tinyColor(data)
    const hsl = color.toHsl()
    const hsv = color.toHsv()
    const rgb = color.toRgb()
    const hex = color.toHex()
    const hex8 = color.toHex8()

    if (hsl.s === 0) {
        hsl.h = oldHue || 0
        hsv.h = oldHue || 0
    }

    const correctHex = hex === '000000' && rgb.a === 0 ? 'transparent' : hex
    const correctHex8 = hex8 === '00000000' ? 'transparent' : hex8

    return {
        hsl,
        hex: correctHex,
        hex8: correctHex8,
        rgb,
        hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
    }
}

type HexColor = string;

interface Props {
    color: string;
    onChange: (color: RgbColor) => void;
    presetColors?: string[];
    recentColors?: string[];
    disableAlpha?: boolean;
}

enum ColorsBlock {
    preset = 'preset',
    recent = 'recent',
}

type RgbName = 'r' | 'g' | 'b';

type RgbColor = Record<RgbName, number>;

export interface ColorState {
    hex: HexColor | 'transparent';
    hex8: HexColor | 'transparent';
    rgb: RgbColor;
    hsl: any;
    hsv: any;
    oldHue: number;
    source: string;
}

class CustomColorPicker extends React.Component<Props, ColorState> {
    constructor(props: Props) {
        super(props)

        this.state = toState(props.color, 0)
    }

    static getDerivedStateFromProps(props: Props, state: ColorState) {
        return toState(props.color, state.oldHue)
    }

    render() {
        const maxHeight = this.props.disableAlpha ? 320 : 340

        return (
            <div className={style.container} style={{ maxHeight }}>
                <div className={style.saturation}>
                    <Saturation
                        hsl={this.state.hsl}
                        hsv={this.state.hsv}
                        pointer={CustomPointer}
                        onChange={this.onChangeColor}
                    />
                </div>

                <div className={style.hueContainer}>
                    <div className={style.hue}>
                        <Hue
                            hsl={this.state.hsl}
                            pointer={CustomSlider}
                            onChange={this.onChangeColor}
                            direction="horizontal"
                        />
                    </div>

                    <div className={style.previewSwatch}
                        style={{ background: `#${this.state.hex}` }}
                    />

                    {this.renderAlpha()}
                </div>

                <div className={style.customInputs}>
                    {this.renderHexInput()}
                    {this.renderRgbContainer()}
                </div>

                {this.renderPresetColors()}
                {this.renderRecentColors()}
            </div>
        )
    }

    renderRgbContainer() {
        return (
            <div className={style.rgbContainer}>
                {this.renderRgbInput('r')}
                {this.renderRgbInput('g')}
                {this.renderRgbInput('b')}
            </div>
        )
    }

    renderAlpha() {
        if (this.props.disableAlpha) {
            return
        }

        return (
            <React.Fragment>
                <div className={style.hue}>
                    <Alpha
                        hsl={this.state.hsl}
                        rgb={this.state.rgb}
                        pointer={CustomSlider}
                        onChange={this.onChangeColor}
                        direction="horizontal"
                    />
                </div>

                <div className={style.previewSwatch}
                    style={{ background: `#${this.state.hex8}` }}
                />
            </React.Fragment>
        )
    }

    renderRgbInput(element: RgbName) {
        return (
            <div className={style.inputContainer}
                data-name={element}
            >
                <EditableInput
                    value={this.state.rgb[element]}
                    onChange={(data) => this.handleInputChange(data, element)}
                    style={inputStyles.rgb}
                />

                <div className={style.caption}>{_.toUpper(element)}</div>
            </div>
        )
    }

    renderHexInput() {
        const value = this.props.disableAlpha ? this.state.hex : this.state.hex8
        
        return (
            <div className={style.inputContainer}
                data-name="hex"
            >
                <EditableInput
                    style={inputStyles.hex}
                    value={value}
                    onChange={this.props.onChange}
                />

                <div className={style.caption}>Hex</div>
            </div>
        )
    }

    renderPresetColors() {
        if (this.props.presetColors && this.props.presetColors.length) {
            return this.renderColorSwatches(this.props.presetColors, ColorsBlock.preset)
        }

        return null
    }

    renderRecentColors() {
        if (this.props.recentColors && this.props.recentColors.length) {
            return this.renderColorSwatches(this.props.recentColors, ColorsBlock.recent)
        }

        return null
    }

    renderColorSwatches(colors: string[], colorBlock: string) {
        return (
            <div>
                <div className={style.divider} />

                <div className={style.swatches}
                    data-name={colorBlock}
                >
                    {colors.map((color, index) => (
                        <div
                            title={`#${color}`}
                            onClick={() => this.props.onChange(color)}
                            className={style.swatchSquare}
                            style={{ backgroundColor: color }}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        )
    }

    onChangeColor = (data) => {
        const color = toState(data, data.h || this.state.oldHue)

        this.setState(color)
        this.props.onChange(color.rgb)
    }

    handleInputChange(value: string, key: RgbName) {
        const newColor = {
            ...this.state.rgb,
            [key]: parseInt(value),
        }

        const color = toState(newColor, this.state.oldHue)

        this.setState(color)
        this.props.onChange(color.rgb)
    }
}
/* eslint-disable */
export default CustomPicker(CustomColorPicker);
/* eslint-enable */
