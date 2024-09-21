// @ts-nocheck
import classNames from 'classnames'
import _ from 'lodash'
import { action, makeObservable } from 'mobx'
import React, { Component } from 'react'

import { SelectBox as BaseSelectBox, SelectBoxProps } from './SelectBox'
import { mergeStyles } from '../../utils'
import { WSChip as Chip } from '../WSChip'

import styles from './SelectBox.module.css'

export class SelectBox extends Component<SelectBoxProps> {
    constructor(props) {
        super(props)

        makeObservable(this)
    }

    render() {
        const { label, className, options, multiSelect, ...otherProps } = this.props
        const theme = mergeStyles(otherProps.theme, styles)
        const classNameContainer = classNames(className, styles.Container)

        return (
            <div className={classNameContainer}>
                <div className={theme.Title}>{label}</div>

                <BaseSelectBox
                    auto={false}
                    {...otherProps}
                    source={this._elements}
                    theme={theme}
                    onChange={this._onChange}
                />

                {this.renderChip()}
            </div>
        )
    }

    renderChip() {
        if (!this.props.multiSelect) {
            return null
        }

        return <div>{this.renderList()}</div>
    }

    renderList(): React.ReactNode {
        return _.map(this.props.value, value => {
            const element = _.find(this._source, { value })

            if (!element) {
                return null
            }

            return (
                <Chip
                    key={value}
                    deletable
                    onDeleteClick={() => this._onDelete(value)}
                >
                    {element.label}
                </Chip>
            )
        })
    }

    @action _onChange = (value: number | string) => {
        let newValue = value

        if (this.props.multiSelect) {
            newValue = [...this.props.value, value]
        }

        this.props.onChange(newValue)
    }

    _onDelete(value: number | string) {
        const newValue = _.without(this.props.value, value)

        this.props.onChange(newValue)
    }

    get _elements() {
        const { multiSelect } = this.props

        if (multiSelect) {
            return _.filter(this._source, option => _.indexOf(this.props.value, option.value) == -1)
        }

        return this._source
    }

    get _source() {
        return this.props.source || this.props.options || []
    }
}
