// @ts-nocheck
import classNames from 'classnames'
import React from 'react'
import { Tooltip, Dropdown } from 'ui-kit-core'
import type { Position } from 'ui-kit-core/dist/components/Tooltip'

import Picker from './Picker'

import style from './Color.module.css'

interface Props {
    color: string | object;
    onChange: (color: any) => void;
    disableAlpha: boolean;
    disabled: boolean;
    title?: string;
    name?: string;
    tooltip?: string;
    tooltipPosition?: Position;
}

interface State {
    visible: boolean;
}

export class ColorPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.ref = React.createRef()

        this.state = {
            visible: false,
        }
    }

    ref: React.RefObject<HTMLDivElement>

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true)
    }

    render() {
        const align = {
            points: ['tl', 'bl'],
        }

        return (
            <div>
                {this.renderTitle()}

                <Dropdown
                    overlay={this.renderMenu()}
                    trigger={['click']}
                    align={align}
                    closeOnSelect={false}
                    onVisibleChange={this.onVisibleChange}
                    visible={this.state.visible}
                    disabled={this.props.disabled}
                >
                    {this.renderButton()}
                </Dropdown>
            </div>
        )
    }

    renderTitle() {
        if (!this.props.title) {
            return null
        }

        const className = classNames({
            [style.Title]: true,
            [style.disabled]: this.props.disabled,
        })

        if (this.state.visible) {
            return (
                <div className={className}>
                    {this.props.title}
                </div>
            )
        }

        return (
            <div className={className}>
                <Tooltip
                    tooltip={this.props.tooltip}
                    tooltipPosition={this.props.tooltipPosition}
                    composedComponent="div"
                >
                    {this.props.title}
                </Tooltip>
            </div>
        )
    }

    renderButton() {
        const className = classNames({
            [style.color]: true,
            [style.disabled]: this.props.disabled,
        })

        return (
            <div className={style.swatch}>
                <div
                    data-name={this.props.name || this.props.title}
                    className={className}
                    style={{
                        background: this.props.color,
                    }}
                />
            </div>
        )
    }

    renderMenu() {
        return (
            <div
                className={style.picker}
                ref={this.ref}
            >
                <Picker
                    {...this.props}
                    onCloseMenu={this.onCloseMenu}
                />
            </div>
        )
    }

    handleClickOutside = (event) => {
        if (this.ref.current && !this.ref.current.contains(event.target)) {
            this.onCloseMenu()
        }
    }

    onVisibleChange = () => {
        this.setState({ visible: true })
    }

    onCloseMenu = () => {
        this.setState({ visible: false })
    }
}
