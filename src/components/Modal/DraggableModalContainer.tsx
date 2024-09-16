// @ts-nocheck
import _ from 'lodash'
import React, { Component } from 'react'

import styles from './DraggableModalContainer.module.css'

/* eslint-disable */
export default class DraggableModalContainer extends Component {
    static defaultProps = {
        nonDraggable: false,
        draggableTarget: `.${styles.Header}`,
    }

    state = {
        isDragging: false,
        currentPosition: {
            x: 0,
            y: 0,
        },
        movePosition: {
            x: 0,
            y: 0,
        },
    }

    constructor(props) {
        super(props)

        document.addEventListener('mousedown', this._startDrag)
        document.addEventListener('mousemove', this._move)
        document.addEventListener('mouseup', this._endDrag)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this._startDrag)
        document.removeEventListener('mousemove', this._move)
        document.removeEventListener('mouseup', this._endDrag)
    }

    render() {
        const containerPosition = {
            top: this.state.movePosition.y,
            left: this.state.movePosition.x,
        }

        return (
            <div
                ref={this._setContainerNode}
                className={styles.Container}
                style={containerPosition}
            >
                {this.props.children}
            </div>
        )
    }

    _startDrag = event => {
        if (!this._targetNodes) {
            this._setTargetNode()
        }

        if (this._hasClickedOnTheCurrentElement(event.target)) {
            this.setState({
                isDragging: true,
                startDragPosition: {
                    x: event.x,
                    y: event.y,
                },
            })
        }
    }

    _move = event => {
        if (this.state.isDragging) {
            this.setState(state => {
                const newX = state.currentPosition.x + (event.x - state.startDragPosition.x)
                const newY = state.currentPosition.y + (event.y - state.startDragPosition.y)

                return {
                    movePosition: {
                        x: newX,
                        y: newY,
                    },
                }
            })
        }
    }

    _endDrag = () => {
        if (this.state.isDragging) {
            this.setState(state => {
                return {
                    isDragging: false,
                    currentPosition: state.movePosition,
                }
            })
        }
    }

    _hasClickedOnTheCurrentElement(target) {
        let currentNode = target

        while (currentNode) {
            if (_.includes(this._targetNodes, currentNode)) {
                return true
            }

            currentNode = currentNode.parentNode
        }

        return false
    }

    _setTargetNode() {
        if (!this._containerNode) {
            return
        }

        const nodes = this._containerNode.querySelectorAll(this.props.draggableTarget)

        this._targetNodes = nodes
    }

    _setContainerNode = node => {
        this._containerNode = node
    }
}
/* eslint-enable */
