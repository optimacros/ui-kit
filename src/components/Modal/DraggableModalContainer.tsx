import { includes } from 'lodash'
import React, { Component } from 'react'

import styles from './DraggableModalContainer.module.css'

export type Props = React.PropsWithChildren<{
    draggableTarget: string;
}>

type State = {
    isDragging: boolean;
    currentPosition: {
        x: number;
        y: number;
    };
    movePosition: {
        x: number;
        y: number;
    };
    startDragPosition?: {
        x: number;
        y: number;
    };
}

export default class DraggableModalContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        document.addEventListener('mousedown', this.startDrag)
        document.addEventListener('mousemove', this.move)
        document.addEventListener('mouseup', this.endDrag)

        this.state = {
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
    }

    private containerNode: HTMLDivElement | null = null
    private targetNodes: NodeListOf<Element> | null = null

    componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.startDrag)
        document.removeEventListener('mousemove', this.move)
        document.removeEventListener('mouseup', this.endDrag)
    }

    render(): React.JSX.Element {
        const containerPosition = {
            top: this.state.movePosition.y,
            left: this.state.movePosition.x,
        }

        return (
            <div
                ref={this.setContainerNode}
                className={styles.Container}
                style={containerPosition}
            >
                {this.props.children}
            </div>
        )
    }

    private startDrag = (event: MouseEvent): void => {
        if (!this.targetNodes) {
            this.setTargetNode()
        }

        if (this.hasClickedOnTheCurrentElement(event.target)) {
            this.setState({
                isDragging: true,
                startDragPosition: {
                    x: event.x,
                    y: event.y,
                },
            })
        }
    }

    private move = (event: MouseEvent): void => {
        if (this.state.isDragging) {
            this.setState((state) => {
                const newX = state.currentPosition.x + (event.x - (state.startDragPosition?.x ?? 0))
                const newY = state.currentPosition.y + (event.y - (state.startDragPosition?.y ?? 0))

                return {
                    movePosition: {
                        x: newX,
                        y: newY,
                    },
                }
            })
        }
    }

    private endDrag = (): void => {
        if (this.state.isDragging) {
            this.setState((state) => {
                return {
                    isDragging: false,
                    currentPosition: state.movePosition,
                }
            })
        }
    }

    private hasClickedOnTheCurrentElement(target: EventTarget | null): boolean {
        let currentNode = target

        while (currentNode) {
            if (includes(this.targetNodes, currentNode)) {
                return true
            }

            currentNode = (currentNode as HTMLElement).parentNode
        }

        return false
    }

    private setTargetNode(): void {
        if (!this.containerNode) {
            return
        }

        this.targetNodes = this.containerNode.querySelectorAll(this.props.draggableTarget)
    }

    private setContainerNode = (node: HTMLDivElement | null): void => {
        this.containerNode = node
    }
}
