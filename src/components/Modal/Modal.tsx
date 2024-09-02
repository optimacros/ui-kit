import classNames from 'classnames'
import React, { Component } from 'react'
import type BaseReactModal from 'react-modal'

import Draggable from './DraggableModalContainer'
import ReactModal from './ReactModal'
import { FontIcon } from '../FontIcon'

import styles from './Modal.module.css'

export interface Props extends BaseReactModal.Props {
    title?: string | React.ReactNode;
    compact?: boolean;
    nonDraggable?: boolean;
    isFatalError?: boolean;
    draggableTarget?: string;
    customHeaderButton?: React.ReactNode;
    headerClassName?: string;
    contentClassName?: string;
}

export type ModalProps = React.PropsWithChildren<Props>

export class Modal extends Component<ModalProps> {
    render(): React.JSX.Element {
        const containerClassName = classNames({
            [styles.Container]: true,
            [styles.Container__compact]: this.props.compact ?? false,
        })
        const contentClassName = this.props.contentClassName
            ? classNames({
                [styles.Content]: true,
                [this.props.contentClassName]: !!this.props.contentClassName,
            })
            : styles.Content

        const {
            title,
            compact,
            nonDraggable,
            isFatalError,
            draggableTarget,
            customHeaderButton,
            headerClassName,
            contentClassName: contentClass,
            ...rest
        } = this.props

        const className = classNames(this.props.className, styles.ReactModal__Content)
        const overlayClassName = classNames(this.props.overlayClassName, styles.ReactModal__Overlay)

        return (
            <ReactModal
                {...rest}
                contentLabel="optimacros-modal"
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
                className={className}
                overlayClassName={overlayClassName}
            >
                <Draggable draggableTarget={this.props.draggableTarget ?? `.${styles.Header}`}>
                    <div className={containerClassName}>
                        {this.renderHeader()}

                        <div className={contentClassName}>
                            {this.props.children}
                        </div>
                    </div>
                </Draggable>
            </ReactModal>
        )
    }

    renderHeader(): React.JSX.Element | null {
        if (!this.props.title) {
            return null
        }

        const className = this.props.headerClassName
            ? classNames({
                [styles.Header]: true,
                [this.props.headerClassName]: !!this.props.headerClassName,
                [styles.Header__draggable]: !(this.props.nonDraggable ?? false),
            })
            : classNames({
                [styles.Header]: true,
                [styles.Header__draggable]: !(this.props.nonDraggable ?? false),
            })

        return (
            <div className={className}>
                <div className={styles.Header_Title}>
                    {this.props.title}
                </div>

                <div className={styles.CustomHeaderContainer}>
                    {this.props.customHeaderButton}
                </div>

                {this.renderCloseButton()}
            </div>
        )
    }

    renderCloseButton(): React.JSX.Element | null {
        if (!this.props.onRequestClose || this.props.isFatalError) {
            return null
        }

        return (
            <div className={styles.CloseButton}>
                <FontIcon
                    value="close"
                    className={styles.CloseButton_Icon}
                    onClick={this.props.onRequestClose}
                />
            </div>
        )
    }
}
