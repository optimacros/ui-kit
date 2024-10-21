// @ts-nocheck
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { FontIcon } from 'ui-kit-core'

import Draggable from './DraggableModalContainer'
import ReactModal from './ReactModal'

import styles from './Modal.module.css'
/* eslint-disable */
export default class Modal extends Component {
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        isOpen: PropTypes.bool.isRequired,
        compact: PropTypes.bool,
        nonDraggable: PropTypes.bool,
        isFatalError: PropTypes.bool,
        draggableTarget: PropTypes.string,
        customHeaderButton: PropTypes.any,
        headerClassName: PropTypes.string,
        contentClassName: PropTypes.string,
    }

    static defaultProps = {
        nonDraggable: false,
        draggableTarget: `.${styles.Header}`,
    }

    render() {
        const containerClassName = classNames({
            [styles.Container]: true,
            [styles.Container__compact]: this.props.compact,
        })
        const contentClassName = classNames({
            [styles.Content]: true,
            [this.props.contentClassName]: !!this.props.contentClassName,
        })

        return (
            <ReactModal
                ariaHideApp={false}
                contentLabel="optimacros-modal"
                shouldCloseOnOverlayClick={false}
                {...this.props}
            >
                <Draggable
                    draggableTarget={this.props.draggableTarget}
                    nonDraggable={this.props.nonDraggable}
                >
                    <div className={containerClassName}>
                        {this.renderHeader()}

                        <div className={contentClassName}>{this.props.children}</div>
                    </div>
                </Draggable>
            </ReactModal>
        )
    }

    renderHeader() {
        if (!this.props.title) {
            return null
        }

        const className = classNames({
            [styles.Header]: true,
            [this.props.headerClassName]: !!this.props.headerClassName,
            [styles.Header__draggable]: !this.props.nonDraggable,
        })

        return (
            <div className={className}>
                <div className={styles.Header_Title}>{this.props.title}</div>

                <div className={styles.CustomHeaderContainer}>{this.props.customHeaderButton}</div>

                {this.renderCloseButton()}
            </div>
        )
    }

    renderCloseButton() {
        if (!this.props.onRequestClose || this.props.isFatalError) {
            return null
        }

        return (
            <div className={styles.CloseButton}>
                <FontIcon
                    className={styles.CloseButton_Icon}
                    value="close"
                    onClick={this.props.onRequestClose}
                />
            </div>
        )
    }
}
/* eslint-enable */
