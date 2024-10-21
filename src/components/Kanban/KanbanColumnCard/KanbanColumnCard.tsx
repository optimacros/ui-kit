import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { Draggable, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

import { isBig, isMedium, isSmall } from '../kanban-card-sizes';
import { KanbanProps } from '../types';

import styles from './KanbanColumnCard.module.css';

type Props = Pick<KanbanProps, 'currentSizeCard' | 'isCardUpdating'> & {
    className?: string;
    draggableId: string;
    index: number;
    value: string;
};

@observer
export class KanbanColumnCard extends React.PureComponent<Props> {
    static identifier = 'kanbanColumnCard';

    static componentLabel = 'kanbanColumnCardLabel';

    render() {
        const { currentSizeCard, draggableId, index, className, value } = this.props;

        const classNameCardContent = classNames({
            [styles.CardContent]: true,
            [styles.CardContent_disableCard]: this.disableCard,
            [styles.CardContent_small]: isSmall(currentSizeCard),
            [styles.CardContent_medium]: isMedium(currentSizeCard),
            [styles.CardContent_big]: isBig(currentSizeCard),
        });

        return (
            <Draggable draggableId={draggableId} index={index} isDragDisabled={this.disableCard}>
                {(provided, snapshot) => {
                    const classNameWrapper = classNames(styles.Wrapper, className);

                    const containerClassName = classNames(
                        styles.Container,
                        styles.Container_noStyle,
                    );

                    const classNameElement = classNames({
                        [styles.Item]: true,
                        [styles.Item_noStyle]: true,
                        [styles.Item_disabled]: this.disableCard,
                        [styles.Item_dragging]: snapshot.isDragging,
                        disabled: this.disableCard,
                    });

                    const { placeholder } = provided;

                    return (
                        <div className={classNameWrapper}>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={containerClassName}
                                style={this.getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style,
                                )}
                            >
                                <div className={classNameElement}>
                                    <div className={styles.Card}>
                                        <div className={classNameCardContent}>
                                            <span className={styles.CardContentHash}>{value}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {placeholder}
                        </div>
                    );
                }}
            </Draggable>
        );
    }

    getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggableProvidedDraggableProps['style'],
    ): React.CSSProperties => {
        // @ts-ignore
        return {
            userSelect: 'none',

            // styles we need to apply on draggables
            ...draggableStyle,
        };
    };

    private get disableCard() {
        return this.props.isCardUpdating;
    }
}
