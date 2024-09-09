// @ts-nocheck
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'

import FilterInput from './FilterInput'
import { FilterSearchState } from '../../state'
import { LocalLoader } from '../LocalLoader'
import { TreeLineMenu } from '../TreeMenu'

import styles from './FilterMenu.module.css'

interface Props {
	elements: Array<Element>;
	classNameContainer: string;
	disableSettingIcon: boolean;
	loading: boolean;
	autoFocus: boolean;
	value: any;
	optionsLabel: any;
	state: any;
	closeMenu: () => void;
	onClickSettingIcon: () => void;
	onChangeInput: () => void;
	onSelect: () => void;
	onClick: () => void;
}

@observer
export class FilterMenu extends React.Component<Props> {
    constructor(props) {
        super(props)

        this._search = new FilterSearchState()

        if (props.value) {
            this._search.filter(props.value)
        }

        this._search.updateElements(props.elements)
    }

    componentDidMount(prevProps) {
        if (this.props.elements != prevProps.elements) {
            this._search.updateElements(this.props.elements)
        }
    }

    render() {
        const { classNameContainer, loading } = this.props
        const classNamesForContainer = classNames(styles.Container, classNameContainer)

        if (loading) {
            return <LocalLoader />
        }

        return (
            <div className={classNamesForContainer}>
                <FilterInput
                    autoFocus={this.props.autoFocus}
                    disableSettingIcon={this.props.disableSettingIcon}
                    optionsLabel={this.props.optionsLabel}
                    value={this._search.value}
                    onChange={this._onChange}
                    onClear={this._onClear}
                    onClickSettingIcon={this.props.onClickSettingIcon}
                    onCloseMenu={this._onCloseMenu}
                />

                <div className={styles.ContainerMenu}>{this.renderContent()}</div>
            </div>
        )
    }

    renderContent() {
        const { classNameContainer, state, ...otherProps } = this.props

        return (
            <TreeLineMenu
                {...otherProps}
                closeMenu={this._onCloseMenu}
                elements={this._search.elements}
            />
        )
    }

    _onCloseMenu = () => {
        if (this.props.onClick) {
            this.props.onClick()
        }
    }

    _onChange = value => {
        // eslint-disable-next-line no-console
        console.log('value', value)

        this._search.filter(value)

        if (this.props.onChangeInput) {
            this.props.onChangeInput(value)
        }
    }

    _onClear = () => {
        this._search.clear()
    }
}
