/* eslint-disable react/default-props-match-prop-types */
// @ts-nocheck
import _ from 'lodash';
import React from 'react';
import { Toolbar, Button, IconButton } from 'ui-kit-core';

import CustomPicker from './CustomPicker';

import style from './Color.module.css';

interface Props {
    color: string | object;
    onCloseMenu: () => void;
    onClickSettingsIcon: () => void;
    onShowError: () => void;
    onChange: (color: object) => void;
    saveColor: (color: string) => void;
    disableAlpha: boolean;
    cancelLabel: string;
    applyLabel: string;
    showSettings: boolean;
    colorSettingsLabel: string;
    recentColorsLabel: string;
    presetColors: string[];
    recentColors: string[];
    innerRef?: any;
}

export default class Picker extends React.Component<Props> {
    static defaultProps = {
        cancelLabel: 'Cancel',
        applyLabel: 'Ok',
        colorSettingsLabel: 'Color Settings',
        recentColorsLabel: 'Recent colors',
        showSettings: false,
        color: '#000000',
    };

    state = {
        background: this.props.color,
        color: {
            hex: this.props.color,
        },
    };

    render() {
        return (
            <div className={style.popover} ref={this.props.innerRef}>
                <div className={style.colorPicker}>
                    <CustomPicker
                        width="200px"
                        color={this.state.background}
                        onChange={this._onSelectColor}
                        disableAlpha={this.props.disableAlpha}
                        presetColors={this.props.presetColors}
                        recentColors={this.props.recentColors}
                        recentColorsLabel={this.props.recentColorsLabel}
                    />

                    <Toolbar align="left" className={style.toolbar}>
                        {this.props.showSettings && (
                            <IconButton
                                icon="settings"
                                className={style.SettingsButtonIcon}
                                onClick={() => this._onClickSettingsIcon()}
                                label={this.props.colorSettingsLabel}
                            />
                        )}

                        <Button
                            className={style.button}
                            label={this.props.cancelLabel}
                            onClick={this._onClosePicker}
                            gray
                        />

                        <Button
                            type="submit"
                            className={style.button}
                            label={this.props.applyLabel}
                            onClick={this._onChangeColor}
                            accent
                        />
                    </Toolbar>
                </div>
            </div>
        );
    }

    _onClickSettingsIcon() {
        if (this.props.onClickSettingsIcon) {
            this.props.onClickSettingsIcon();
        }

        this._onClosePicker();
    }

    _onClosePicker = () => {
        if (this.props.onCloseMenu) {
            this.props.onCloseMenu();
        }
    };

    _onSelectColor = (color) => {
        this.setState({
            color,
            background: color.hex,
        });
    };

    _onChangeColor = () => {
        const hasColor = !_.isEmpty(this.state.color);
        const isValidColor = this._isValidColor(this.state.background);

        if (!isValidColor) {
            if (this.props.onShowError) {
                this.props.onShowError();
            }

            return;
        }

        if (this.props.onChange && hasColor && isValidColor) {
            this.props.onChange(this.state.color);

            if (this.props.saveColor) {
                this.props.saveColor(this.state.color.hex as string);
            }
        }

        if (this.props.onCloseMenu) {
            this.props.onCloseMenu();
        }
    };

    _isValidColor(color) {
        const regExp = /^#[0-9A-F]{6}$/i;
        const stringValue = _.toString(color);

        return regExp.test(stringValue);
    }
}
