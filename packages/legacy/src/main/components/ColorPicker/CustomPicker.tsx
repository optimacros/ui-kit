// @ts-nocheck
import _ from 'lodash';
import React from 'react';
import { CustomPicker } from 'react-color';
import { Saturation, EditableInput, Hue } from 'react-color/lib/components/common';
import tinyColor from 'tinycolor2';

import style from './CustomPicker.module.css';

const inputStyles = {
    hex: {
        input: {
            textAlign: 'center',
            width: '60px',
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
};

const CustomSlider = () => {
    return <div className={style.slider} />;
};

const CustomPointer = () => {
    return <div className={style.pointer} />;
};

export const toState = (data, oldHue: number): State => {
    const color = data.hex ? tinyColor(data.hex) : tinyColor(data);
    const hsl = color.toHsl();
    const hsv = color.toHsv();
    const rgb = color.toRgb();
    const hex = color.toHex();

    if (hsl.s === 0) {
        hsl.h = oldHue || 0;
        hsv.h = oldHue || 0;
    }

    const transparent = hex === '000000' && rgb.a === 0;

    return {
        hsl,
        hex: transparent ? 'transparent' : `#${hex}`,
        rgb,
        hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
    };
};

type HexColor = string;

interface Props {
    color: string;
    onChange: (color: HexColor) => void;
    presetColors?: string[];
    recentColors?: string[];
}

enum ColorsBlock {
    preset = 'preset',
    recent = 'recent',
}

type RgbName = 'r' | 'g' | 'b';

type RgbColor = Record<RgbName, number>;

interface State {
    hex: HexColor | 'transparent';
    rgb: RgbColor;
    hsl: any;
    hsv: any;
    oldHue: number;
    source: string;
}

class CustomColorPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = toState(props.color, 0);
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        return toState(props.color, state.oldHue);
    }

    render() {
        return (
            <div className={style.container}>
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

                    <div className={style.previewSwatch} style={{ background: this.state.hex }} />
                </div>

                <div className={style.customInputs}>
                    {this.renderHexInput()}
                    {this.renderRgbContainer()}
                </div>

                {this.renderPresetColors()}
                {this.renderRecentColors()}
            </div>
        );
    }

    renderRgbContainer() {
        return (
            <div className={style.rgbContainer}>
                {this.renderRgbInput('r')}
                {this.renderRgbInput('g')}
                {this.renderRgbInput('b')}
            </div>
        );
    }

    renderRgbInput(element: RgbName) {
        return (
            <div className={style.inputContainer} data-name={element}>
                <EditableInput
                    value={this.state.rgb[element]}
                    onChange={(data) => this.handleInputChange(data, element)}
                    style={inputStyles.rgb}
                />

                <div className={style.caption}>{_.toUpper(element)}</div>
            </div>
        );
    }

    renderHexInput() {
        return (
            <div className={style.inputContainer} data-name="hex">
                <EditableInput
                    style={inputStyles.hex}
                    value={_.replace(this.state.hex, '#', '')}
                    onChange={this.props.onChange}
                />

                <div className={style.caption}>Hex</div>
            </div>
        );
    }

    renderPresetColors() {
        if (this.props.presetColors && this.props.presetColors.length) {
            return this.renderColorSwatches(this.props.presetColors, ColorsBlock.preset);
        }

        return null;
    }

    renderRecentColors() {
        if (this.props.recentColors && this.props.recentColors.length) {
            return this.renderColorSwatches(this.props.recentColors, ColorsBlock.recent);
        }

        return null;
    }

    renderColorSwatches(colors: string[], colorBlock: string) {
        return (
            <div>
                <div className={style.divider} />

                <div className={style.swatches} data-name={colorBlock}>
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
        );
    }

    onChangeColor = (data) => {
        const colors = toState(data, data.h || this.state.oldHue);

        this.setState(colors);
        this.props.onChange(colors.hex);
    };

    handleInputChange(value: string, key: RgbName) {
        const newColor = {
            ...this.state.rgb,
            [key]: parseInt(value),
        };

        const color = toState(newColor, this.state.oldHue);

        this.setState(color);
        this.props.onChange(color.hex);
    }
}
/* eslint-disable */
export default CustomPicker(CustomColorPicker);
/* eslint-enable */
