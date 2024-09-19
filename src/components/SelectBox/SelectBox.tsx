// @ts-nocheck
/* eslint-disable no-undefined */
import classnames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'
import { Input } from 'ui-kit-core'

import { mergeStyles } from '../../utils'
import events from '../../utils/react-toolbox-utils/events'

import themeStyle from './selectBoxTheme.module.css'

export interface SelectBoxProps {
    source?: (string | any)[];
    allowBlank?: boolean;
    auto?: boolean;
    className?: string;
    disabled?: boolean;
    multiSelect?: boolean;
    error?: string;
    label?: string;
    labelKey?: string;
    name?: string;
    onBlur?: () => void;
    onChange?: (value: number | string) => void;
    onClick?: () => void;
    onFocus?: () => void;
    required?: boolean;
    template?: () => void;
    theme?: {
        Title?: string;
        active?: string;
        disabled?: string;
        dropdown?: string;
        error?: string;
        errored?: string;
        field?: string;
        label?: string;
        required?: string;
        selected?: string;
        focused?: string;
        templateValue?: string;
        up?: string;
        value?: string;
        values?: string;
    };
    value?: string | number;
    valueKey?: string;
}

const KEYS = {
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    TAB: 9,
    ENTER: 13,
    SPACE: 32,
    ESC: 27,
}

export class SelectBox extends Component<SelectBoxProps> {
    static defaultProps = {
        auto: true,
        className: '',
        allowBlank: true,
        disabled: false,
        labelKey: 'label',
        required: false,
        valueKey: 'value',
    }

    state = {
        active: false,
        up: false,
        focusedItemIndex: undefined,
    }

    constructor(props) {
        super(props)

        this.refNode = React.createRef()
        this.dropdownNode = React.createRef()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.active && this.state.active) {
            events.addEventsToDocument(this.getDocumentEvents())
        }

        if (prevState.active && !this.state.active) {
            events.removeEventsFromDocument(this.getDocumentEvents())
        }
    }

    componentWillUnmount() {
        if (this.state.active) {
            events.removeEventsFromDocument(this.getDocumentEvents())
        }
    }

    render() {
        const {
            allowBlank,
            auto,
            labelKey,
            required,
            onChange,
            onFocus,
            onBlur,
            source,
            template,
            theme: customTheme,
            valueKey,
            ...others
        } = this.props

        const theme = customTheme
            ? mergeStyles(customTheme, themeStyle)
            : themeStyle

        const selected = this.getSelectedItem()
        const className = classnames(
            theme.dropdown,
            {
                [theme.up]: this.state.up,
                [theme.active]: this.state.active,
                [theme.disabled]: this.props.disabled,
                [theme.required]: this.props.required,
            },
            this.props.className,
        )

        return (
            <div
                ref={this.refNode}
                className={className}
                data-react-toolbox="dropdown"
                tabIndex="-1"
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
            >
                <Input
                    {...others}
                    className={theme.value}
                    required={this.props.required}
                    tabIndex="0"
                    theme={theme}
                    type={template && selected
                        ? 'hidden'
                        : null}
                    value={selected && selected[labelKey]
                        ? selected[labelKey]
                        : ''}
                    readOnly
                    onClick={this.handleClick}
                />

                {template && selected && this.renderTemplateValue(selected)}

                <ul
                    ref={this.dropdownNode}
                    className={theme.values}
                    onKeyDown={this.handleKeyDown}
                >
                    {source.map(this.renderValue)}
                </ul>
            </div>
        )
    }

    renderTemplateValue(selected) {
        const { theme: customTheme } = this.props
        const theme = customTheme
            ? mergeStyles(customTheme, themeStyle)
            : themeStyle

        const className = classnames(theme.field, {
            [theme.errored]: this.props.error,
            [theme.disabled]: this.props.disabled,
            [theme.required]: this.props.required,
        })

        return (
            <div
                className={className}
                onClick={this.handleClick}
            >
                <div className={`${theme.templateValue} ${theme.value}`}>
                    {this.props.template(selected)}
                </div>

                {this.props.label && (
                    <label className={theme.label}>
                        {this.props.label}
                        {this.props.required && <span className={theme.required}> * </span>}
                    </label>
                )}

                {this.props.error && <span className={theme.error}>{this.props.error}</span>}
            </div>
        )
    }

    renderValue = (item, idx) => {
        const { labelKey, theme: customTheme, valueKey } = this.props
        const theme = customTheme
            ? mergeStyles(customTheme, themeStyle)
            : themeStyle

        const { focusedItemIndex } = this.state
        const className = classnames({
            [theme.selected]: item[valueKey] === this.props.value,
            [theme.disabled]: item.disabled,
            [theme.focused]: idx === focusedItemIndex,
        })

        return (
            <li
                key={idx}
                className={className}
                tabIndex={focusedItemIndex == idx
                    ? 0
                    : -1}
                onClick={!item.disabled
                    ? this.handleSelect.bind(this, item[valueKey])
                    : undefined}
                onFocus={this.setFocusedItemIndex.bind(this, idx)}
            >
                {this.props.template
                    ? this.props.template(item)
                    : item[labelKey]}
            </li>
        )
    }

    getDocumentEvents = () => ({
        click: this.handleDocumentClick,
        touchend: this.handleDocumentClick,
    })

    getSelectedItem = () => {
        for (const item of this.props.source) {
            if (item[this.props.valueKey] === this.props.value) {
                return item
            }
        }

        return !this.props.allowBlank
            ? this.props.source[0]
            : undefined
    }

    getNextSelectableItemIndex = focusedItemIndex => {
        const { source } = this.props
        const lastItemIndex = source.length - 1

        let nextIndex = focusedItemIndex != lastItemIndex
            ? focusedItemIndex + 1
            : 0

        while (source[nextIndex].disabled && nextIndex !== focusedItemIndex) {
            nextIndex = nextIndex != lastItemIndex
                ? nextIndex + 1
                : 0
        }

        return nextIndex
    }

    getPreviousSelectableItemIndex = focusedItemIndex => {
        const { source } = this.props
        const lastItemIndex = source.length - 1

        let previousIndex = focusedItemIndex != 0
            ? focusedItemIndex - 1
            : lastItemIndex

        while (source[previousIndex].disabled && previousIndex !== focusedItemIndex) {
            previousIndex = previousIndex != 0
                ? previousIndex - 1
                : lastItemIndex
        }

        return previousIndex
    }

    handleSelect = (item, event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event)
        }

        if (!this.props.disabled && this.props.onChange) {
            if (this.props.name) {
                event.target.name = this.props.name
            }

            this.props.onChange(item, event)

            this.close()
        }
    }

    handleKeyDown = event => {
        const { source, valueKey } = this.props
        const { focusedItemIndex } = this.state

        const currentItem = source[focusedItemIndex || 0]
        const nextItemIndex = this.getNextSelectableItemIndex(focusedItemIndex || 0)
        const previousItemIndex = this.getPreviousSelectableItemIndex(focusedItemIndex || 0)

        const charCode = event.which || event.keyCode
        let newFocusedItemIndex

        switch (charCode) {
            case KEYS.TAB:
            case KEYS.ESC:
                this.close()

                return
            case KEYS.UP_ARROW:
                newFocusedItemIndex = previousItemIndex
                break
            case KEYS.DOWN_ARROW:
                newFocusedItemIndex = nextItemIndex
                break
            case KEYS.SPACE:
            case KEYS.ENTER:
                if (!currentItem.disabled) {
                    this.handleSelect(currentItem[valueKey], event)
                }

                break
        }

        if (newFocusedItemIndex || newFocusedItemIndex == 0) {
            event.preventDefault()
            event.stopPropagation()

            this.dropdownNode.current.children[newFocusedItemIndex].focus()

            return false
        }
    }

    handleClick = event => {
        this.open(event)

        events.pauseEvent(event)

        if (this.props.onClick) {
            this.props.onClick(event)
        }
    }

    handleDocumentClick = event => {
        const rootElement = this.refNode.current

        if (rootElement && this.state.active && !events.targetIsDescendant(event, rootElement)) {
            this.setState({ active: false })
        }
    }

    close = () => {
        if (this.state.active) {
            this.setState({ active: false })
        }
    }

    open = () => {
        if (this.state.active) {
            return
        }

        const client = this.refNode.current.getBoundingClientRect()
        const screenHeight = window.innerHeight || document.documentElement.offsetHeight
        const up = this.props.auto
            ? client.top > screenHeight / 2 + client.height
            : false

        this.setState({ active: true, up })
    }

    handleFocus = event => {
        event.stopPropagation()

        const { source } = this.props
        const { focusedItemIndex } = this.state

        const dropdown = this.dropdownNode.current

        if (!dropdown || !dropdown.children) {
            return
        }

        let firstFocusableItem = focusedItemIndex || 0
        const isFirstItemDisabled = _.get(source, `[${firstFocusableItem}].disabled`)

        if (isFirstItemDisabled) {
            firstFocusableItem = this.getNextSelectableItemIndex(firstFocusableItem)
        }

        setTimeout(() => {
            const firstFocusableElement = dropdown.children[firstFocusableItem]

            if (firstFocusableElement) {
                firstFocusableElement.focus()
            }
        }, 30)

        if (!this.props.disabled) {
            this.open(event)
        }

        if (this.props.onFocus) {
            this.props.onFocus(event)
        }
    }

    handleBlur = event => {
        event.stopPropagation()

        setTimeout(() => {
            if (this.refNode.current) {
                const currentFocusedItem = document.activeElement

                if (!this.refNode.current.contains(currentFocusedItem)) {
                    this.setState({
                        focusedItemIndex: undefined,
                    })

                    if (this.state.active) {
                        this.close()
                    }

                    if (this.props.onBlur) {
                        this.props.onBlur(event)
                    }
                }
            }
        }, 30)
    }

    setFocusedItemIndex = (idx, event) => {
        event.stopPropagation()

        this.setState({
            focusedItemIndex: idx,
        })
    }
}
