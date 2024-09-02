/* eslint-disable @typescript-eslint/camelcase */
import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { FontIcon } from 'ui-kit-core'
import { valueFromZoom } from '../../../utils'
import { BaseMenuElement } from './BaseMenuElement'

import {
    BASE_MENU_STATIC_OFFSET_ELEMENT,
    BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_0,
    BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_1,
    BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_2,
    BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_3,
    BASE_MENU_PADDING_LEFT_ELEMENT,
} from '../../../constants'

interface BaseMenuProps {
    /**
     * Do not render the "plus" icon, all branches
     * will be always expanded.
     */
    elements: React.ReactNode;
    keyHandler: boolean;
    isStatic?: boolean;
    /**
     * ```js
     * <TreeMenu
     *   elements={elements}
     *   onSelect={(element) => state.select(element)}
     * />
     * ```
     */
    onSelect?: () => void;
    closePortal?: () => void;
    emptyElementMessage?: string;
    sizeFromZoom?: boolean;
    scrollPosition?: number;
    renderElement?: () => void;
    theme?: {
        Menu_small?: string;
        Menu_normal?: string;
        Menu_big?: string;
        Menu__static?: string;
        List?: string;
        ButtonArrow?: string;
        ButtonArrow__active?: string;
        ButtonArrowIcon?: string;
        MessageEmptyElements?: string;
        Border?: string;
        BorderContainer?: string;
        Border__active?: string;
        Border__missingParent?: string;
    };
    highlightedPosition?: number;
    changeHighlightedPosition?: () => void;
    theParentElementDoesNotExist?: string;
}

@observer
export default class BaseMenu extends React.Component<BaseMenuProps> {
    static defaultProps = {
        theParentElementDoesNotExist: "The parent element doesn't exist",
    }

    state = {
        vector: null,
    }

    render() {
        const { theme, isStatic, keyHandler } = this.props
        const zoomClassNames = valueFromZoom([[theme.Menu_small], [theme.Menu_normal], [theme.Menu_big]])

        const className = classNames(
            {
                [theme.Menu]: true,
                [theme.Menu__static]: isStatic,
                [theme.Menu__hoverDisabled]: keyHandler,
                [zoomClassNames]: this.props.sizeFromZoom,
            },
            this.props.className,
        )

        let style = {}

        if (this.props.lazyScroll) {
            style = {
                top: this.props.scrollPosition || 0,
                position: 'absolute',
            }
        }

        return (
            <div
                className={className}
                style={style}
            >
                {this.renderMessageEmptyElements()}
                {this.renderList()}
            </div>
        )
    }

    renderMessageEmptyElements() {
        const { emptyElementMessage, elements, theme } = this.props

        if (emptyElementMessage && _.isEmpty(elements)) {
            return <div className={theme.MessageEmptyElements}>{emptyElementMessage}</div>
        }
    }

    renderList() {
        const { elements, theme } = this.props

        if (_.isEmpty(this.props.elements)) {
            return null
        }

        return <div className={theme.List}>{_.map(elements, this.renderElement)}</div>
    }

    renderElement = (element, index) => {
        const { theme } = this.props
        const { offset } = element
        const style = {
            paddingLeft: this._paddingLeft * offset || 0,
        }

        const key = !_.isUndefined(element.entityLongId) ? element.entityLongId : index

        return (
            <div
                key={key}
                style={style}
                className={theme.ListElement}
                data-name={element.title || element.label}
            >
                {this.renderBorder(element)}
                <div className={theme.ListElementInner}>
                    {this.renderArrow(element)}

                    <BaseMenuElement
                        element={element}
                        renderElement={this.props.renderElement}
                        onSelect={this._onSelect}
                        theme={this.props.theme}
                        isSelected={this._isSelected(element)}
                        isDisabled={this._isElementDisabled(element)}
                        stateDraggable={this.props.stateDraggable}
                        setVector={this._setVector}
                        vector={this.state.vector}
                        height={this.props.elementHeight}
                        isHighlighted={this._isHighlighted(element.index || index)}
                        onMouseMove={() => this._changeHighlightedPosition(element.index || index)}
                    />
                </div>
            </div>
        )
    }

    renderBorder({ nesting, borderOffset, isMissingParent }) {
        const { theme, isTreeLineMenu } = this.props
        const width = this._widthBorder

        if (!isTreeLineMenu) {
            return null
        }

        const elements = _.map(nesting, (element, index) => {
            const className = classNames({
                [theme.Border]: true,
                [theme.Border__active]: element > 0,
                [theme.Border__missingParent]: isMissingParent,
            })

            const style = {
                width,
                marginLeft: this._paddingLeft * borderOffset[index],
            }

            return (
                <div
                    key={index}
                    style={style}
                    className={className}
                >
                    {isMissingParent && (
                        <div
                            className={theme.MissingParentIcon}
                            title={this.props.theParentElementDoesNotExist}
                        />
                    )}
                </div>
            )
        })

        return <div className={theme.BorderContainer}>{elements}</div>
    }

    renderArrow(element) {
        if (this.props.isStatic || !element.children) {
            return null
        }

        const { theme } = this.props
        const className = classNames({
            [theme.ButtonArrow]: true,
            [theme.ButtonArrow__active]: element.arrowActive,
        })

        return (
            <div
                className={className}
                onClick={(event) => this._onArrowClick(element, event)}
            >
                <FontIcon
                    className={theme.ButtonArrowIcon}
                    value={element.arrowActive ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                />
            </div>
        )
    }

    _onSelect = (element, event) => {
        if (this._isElementDisabled(element)) {
            return false
        }

        if (this.props.onSelect) {
            this.props.onSelect(element, event)
        }

        if (this.props.closePortal) {
            this.props.closePortal()
        }
    }

    _isElementDisabled(element) {
        return element.disabled || (_.isNumber(element.accessLevel) && element.accessLevel < 1)
    }

    _isSelected(element) {
        return element.active
    }

    _onArrowClick = (element) => {
        this.props.onToggle(element)
    }

    _setVector = (vector) => {
        this.setState({ vector })
    }

    _isHighlighted = (index) => {
        return this.props.keyHandler && this.props.highlightedPosition == index
    }

    _changeHighlightedPosition = (index) => {
        this.props.changeHighlightedPosition(index)
    }

    get _paddingLeft() {
        if (this.props.sizeFromZoom) {
            return valueFromZoom([
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_0,
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_1,
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_2,
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_3,
            ])
        }

        return BASE_MENU_PADDING_LEFT_ELEMENT
    }

    get _offset() {
        if (this.props.isStatic) {
            return BASE_MENU_STATIC_OFFSET_ELEMENT
        }

        return this._paddingLeft
    }

    get _widthBorder() {
        if (this.props.sizeFromZoom) {
            return valueFromZoom([
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_0,
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_1,
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_2,
                BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_3,
            ])
        }

        return BASE_MENU_PADDING_LEFT_ELEMENT
    }
}
