// @ts-nocheck
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { FontIcon, IconButton } from 'ui-kit-core'

import styles from './FilterInput.module.css'

@observer
export default class FilterInput extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
        onCloseMenu: PropTypes.func,
        onClickSettingIcon: PropTypes.func,
        disableSettingIcon: PropTypes.bool,
        autoFocus: PropTypes.bool,
        optionsLabel: PropTypes.string,
    }

    static defaultProps = {
        autoFocus: false,
        optionsLabel: 'Settings',
    }

    render() {
        return (
            <div className={styles.Container}>
                <input
                    autoFocus={this.props.autoFocus}
                    className={styles.Field}
                    type="text"
                    value={this.props.value}
                    onChange={this._onChange}
                />

                <div
                    className={styles.ClearButton}
                    onClick={this._onClear}
                >
                    <FontIcon
                        className={styles.ClearButtonIcon}
                        value="close"
                    />
                </div>

                {this.renderSubsetFilterButton()}
            </div>
        )
    }

    renderSubsetFilterButton() {
        if (!this.props.onClickSettingIcon) {
            return null
        }

        return (
            <IconButton
                className={styles.SettingsButtonIcon}
                disabled={this.props.disableSettingIcon}
                icon="settings"
                label={this.props.optionsLabel}
                onClick={this._onClickSettingIcon}
            />
        )
    }

    _onClickSettingIcon = () => {
        if (this.props.onClickSettingIcon) {
            this.props.onClickSettingIcon()
        }

        this.props.onCloseMenu()
    }

    _onChange = event => {
        this.props.onChange(event.target.value)
    }

    _onClear = () => {
        this.props.onClear()
    }
}
