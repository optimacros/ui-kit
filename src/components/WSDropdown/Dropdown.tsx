// @ts-nocheck
import classNames from 'classnames'
import BaseDropDown from 'rc-dropdown'
import React from 'react'

import { KEY_CODES } from '../../constants'

import styles from './Dropdown.module.css'

interface Props {
    visible?: boolean;
    disabled?: boolean;
    closeOnSelect?: boolean;
    className?: string;
    trigger?: Array<string>;
    overlay?: React.JSX.Element;
    overlayClassName?: string;
    onVisibleChange?: (visible: boolean) => boolean | void;
    children?: React.ReactNode;
}

interface State {
    visible: boolean;
    lastVisible: boolean;
}

export class WSDropdown extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            visible: props.visible || false,
            lastVisible: props.visible || false,
        }

        document.addEventListener('keydown', this._onGlobalKeyDown, true)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._onGlobalKeyDown, true)
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (props.visible !== state.lastVisible) {
            return { visible: props.visible, lastVisible: props.visible }
        }

        return null
    }

    render() {
        const { visible, onVisibleChange, ...otherProps } = this.props

        if (this.props.disabled) {
            return this.props.children
        }

        const className = classNames(this.props.className, styles.Container)
        const overlayClassName = classNames(this.props.overlayClassName, 'wg-dropdown')

        return (
            <div
                className={className}
                onKeyDown={this._onKeyDown}
            >
                <BaseDropDown
                    visible={this.state.visible}
                    onOverlayClick={this._onOverlayClick}
                    onVisibleChange={this._onVisibleChange}
                    {...otherProps}
                    // eslint-disable-next-line react/jsx-boolean-value
                    destroyPopupOnHide={true}
                    overlayClassName={overlayClassName}
                />
            </div>
        )
    }

    _onVisibleChange = (visible: boolean) => {
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(visible)

            return !this.props.visible
        }

        this.setState({ visible })
    }

    _onOverlayClick = () => {
        if (this.props.closeOnSelect !== false) {
            this._onVisibleChange(false)
        }
    }

    _onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const { SPACE } = KEY_CODES

        if (!this.state.visible && event.keyCode === SPACE) {
            event.preventDefault()
            event.stopPropagation()

            this._onVisibleChange(!this.state.visible)
        }
    }

    _onGlobalKeyDown = (event: KeyboardEvent) => {
        const { ESC } = KEY_CODES

        if (this.state.visible && event.keyCode === ESC) {
            this._onVisibleChange(false)
        }
    }
}
