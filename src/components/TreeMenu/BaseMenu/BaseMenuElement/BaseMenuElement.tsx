// @ts-nocheck
import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { findDOMNode } from 'react-dom'
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd'

import styles from './BaseMenuElement.module.css'

interface BaseMenuElementProps {
    connectDragSource: () => void;
    connectDropTarget: () => void;
    element?: HTMLElement;
    renderElement?: (
        element?: HTMLElement,
        onSelect?: (element?: HTMLElement, event?: any) => void,
    ) => void;
    theme?: object;
    stateDraggable?: object;
    vector?: string;
    // eslint-disable-next-line react/no-unused-prop-types
    setVector?: () => void;
    onMouseMove?: () => void;
    isSelected?: boolean;
    isDisabled?: boolean;
    isHighlighted?: boolean;
}

function _getDragItems({ stateDraggable, monitor }) {
    const { selectedElements } = stateDraggable

    return _.isEmpty(selectedElements) ? [monitor.getItem()] : selectedElements
}

function _calculateInsertRules({ element, stateDraggable, monitor, property }) {
    const { entityLongId, insertRules } = element
    const model = {}

    model[property] = entityLongId

    return {
        ...insertRules,
        childOf: element.insertRules.childOf && !_.find(_getDragItems({ stateDraggable, monitor }), model),
    }
}

const elementTarget = {
    canDrop(props, monitor) {
        if (props.stateDraggable) {
            const dragItems = _getDragItems({
                ...props,
                monitor,
            })

            const insertRules = _calculateInsertRules({
                ...props,
                monitor,
                property: 'parentEntityLongId',
            })

            return props.stateDraggable.canDrop(props, monitor, dragItems, insertRules)
        }
    },

    drop(props, monitor, component) {
        if (!props.stateDraggable || monitor.didDrop()) {
            return null
        }

        const dragItems = _getDragItems({
            ...props,
            monitor,
        })

        const insertRules = _calculateInsertRules({
            ...props,
            monitor,
            property: 'entityLongId',
        })

        const mouseCoordinates = monitor.getClientOffset()
        const boundingClientRect = findDOMNode(component).getBoundingClientRect()

        const position = props.stateDraggable.getPosition(mouseCoordinates, boundingClientRect, insertRules)

        props.stateDraggable.onMoveTo(dragItems, props.element, position)
    },

    hover(props, monitor, component) {
        const insertRules = _calculateInsertRules({
            ...props,
            monitor,
            property: 'parentEntityLongId',
        })

        const mouseCoordinates = monitor.getClientOffset()
        const boundingClientRect = findDOMNode(component).getBoundingClientRect()

        const position = props.stateDraggable.getPosition(mouseCoordinates, boundingClientRect, insertRules)

        props.setVector(position)
    },
}

@dropTarget('BaseMenuElement', elementTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
}))

@dragSource(
    'BaseMenuElement',
    {
        canDrag(props, monitor) {
            return !!props.stateDraggable && props.stateDraggable.canDrag(props, monitor)
        },

        beginDrag(props) {
            return props.element
        },
    },
    (connect) => ({
        connectDragSource: connect.dragSource(),
    }),
)

@observer
export class BaseMenuElement extends React.Component<BaseMenuElementProps> {
    render() {
        const {
            connectDragSource,
            connectDropTarget,
            stateDraggable,
            canDrop,
            isOverCurrent,
            vector,
            theme,
        } = this.props

        const isDraggable = !!stateDraggable

        const className = classNames({
            [theme.Element]: true,
            [theme.Element__selected]: this.props.isSelected,
            [theme.Element__disabled]: this.props.isDisabled,
            [theme.Element__highlighted]: this.props.isHighlighted,
            [styles.Element]: true,
            [styles.Element_canDrop]: isDraggable && canDrop,
            [styles.Element_hover_over]: isDraggable && canDrop && isOverCurrent,
            [styles.Element_hover_before]: isDraggable && canDrop && isOverCurrent && vector == 'before',
            [styles.Element_hover_after]: isDraggable && canDrop && isOverCurrent && vector == 'after',
            [styles.Element_hover_child]: isDraggable && canDrop && isOverCurrent && vector == 'child',
        })

        const style = {
            height: this.props.height,
        }

        if (isDraggable) {
            return connectDragSource(
                connectDropTarget(
                    <div
                        className={className}
                        style={style}
                        onMouseMove={this._onMouseMove}
                    >
                        {this.renderElement()}
                    </div>,
                ),
            )
        }

        return (
            <div
                className={className}
                style={style}
                onMouseMove={this._onMouseMove}
            >
                {this.renderElement()}
            </div>
        )
    }

    renderElement() {
        const { element, theme } = this.props

        if (this.props.renderElement) {
            return this.props.renderElement(element, this._onSelect)
        }

        return (
            <div className={theme.DefaultElementContainer}>
                <div
                    className={theme.DefaultElement}
                    onMouseDown={(event) => this._onSelect(element, event)}
                >
                    {element.title || element.label}
                </div>
            </div>
        )
    }

    _onSelect = (element, event) => {
        this.props.onSelect(element, event)
    }

    _onMouseMove = () => {
        if (this.props.onMouseMove && !this.props.isHighlighted) {
            this.props.onMouseMove()
        }
    }
}
