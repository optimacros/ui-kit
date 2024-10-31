// @ts-nocheck
import React from 'react';
import ReactModal from './ReactModal';
import classNames from 'classnames';
import { Icon } from '../Icon';
import Draggable from './DraggableModalContainer';
import styles from './Modal.module.css';

type ReactModalProps = React.ComponentProps<typeof ReactModal>;

type Props = {
    children: React.ReactNode;
    isOpen: ReactModalProps['isOpen'];
    onRequestClose: ReactModalProps['onRequestClose'];
    className?: string;
    title?: string;
    compact?: boolean;
    nonDraggable?: boolean;
    isFatalError?: boolean;
    draggableTarget?: string;
    customHeaderButton?: React.ReactNode;
    headerClassName?: string;
    containerClassName?: string;
    contentClassName?: string;
    testMode: boolean;
    handleUpdate?: () => void;
};

const MAX_TITLE_LENGTH = 438;

export default class Modal extends React.PureComponent<Props> {
    static defaultProps = {
        nonDraggable: false,
        draggableTarget: `.${styles.Header}`,
        testMode: false,
    };

    componentDidUpdate(prevProps: Props) {
        if (!this.props.isOpen && prevProps.isOpen) {
            this.props.handleUpdate && this.props.handleUpdate();
        }
    }

    render() {
        const {
            compact,
            containerClassName: baseContainerClassName,
            contentClassName: baseContentClassName,
            draggableTarget,
            nonDraggable,
            children,
        } = this.props;

        const containerClassName = classNames(
            {
                [styles.Container]: true,
                [styles.Container__compact]: compact,
            },
            baseContainerClassName,
        );

        const contentClassName = classNames(styles.Content, baseContentClassName);
        const { handleUpdate, ...propsForReactModal } = this.props;

        return (
            <ReactModal
                ariaHideApp={false}
                contentLabel="optimacros-modal"
                shouldCloseOnOverlayClick={false}
                shouldFocusAfterRender
                {...propsForReactModal}
            >
                <Draggable draggableTarget={draggableTarget} nonDraggable={nonDraggable}>
                    <div className={containerClassName} data-react-toolbox="dialog">
                        {this.renderHeader()}
                        <div className={contentClassName}>{children}</div>
                    </div>
                </Draggable>
            </ReactModal>
        );
    }

    renderHeader() {
        const { title, headerClassName, nonDraggable, customHeaderButton } = this.props;

        if (!title) {
            return null;
        }

        const className = classNames({
            [styles.Header]: true,
            [headerClassName]: !!headerClassName,
            [styles.Header__draggable]: !nonDraggable,
        });

        return (
            <div className={className}>
                <div className={styles.Header_Title}>{this.generateTitle()}</div>

                <div className={styles.CustomHeaderContainer}>{customHeaderButton}</div>

                {this.renderCloseButton()}
            </div>
        );
    }

    renderCloseButton() {
        const { onRequestClose } = this.props;

        if (!onRequestClose) {
            return null;
        }

        return (
            <div className={styles.CloseButton}>
                <Icon className={styles.CloseButton_Icon} value="close" onClick={onRequestClose} />
            </div>
        );
    }

    generateTitle() {
        const { title, testMode } = this.props;

        if (!title || testMode) {
            return title;
        }

        let titleLengthInPixels = 0;
        const element = document.createElement('canvas');
        const context = element.getContext('2d');

        if (context) {
            titleLengthInPixels = context.measureText(title).width;
        }

        element.remove();

        if (titleLengthInPixels > MAX_TITLE_LENGTH) {
            const characterMiddleSize = titleLengthInPixels / title.length;
            const lengthsDifference = titleLengthInPixels - MAX_TITLE_LENGTH;
            const charactersAmountForDeleting = lengthsDifference / characterMiddleSize;

            const reducedCopyOfTitle = title.slice(0, -charactersAmountForDeleting);

            return `${reducedCopyOfTitle}...`;
        }

        return title;
    }
}
/* eslint-enable */
