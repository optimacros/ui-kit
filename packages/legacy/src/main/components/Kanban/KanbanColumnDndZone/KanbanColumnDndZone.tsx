import classNames from 'classnames';
import { observer } from 'mobx-react';
import { JSX, PureComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styles from './KanbanColumnDndZone.module.css';

interface Props {
    droppableId: string;
    className?: string;
    direction?: string;
    isStatic?: boolean;
    column: string;
    children: JSX.Element[] | JSX.Element;
}

enum Direction {
    X = 'horizontal',
    Y = 'vertical',
}

@observer
export class KanbanColumnDndZone extends PureComponent<Props> {
    static identifier = 'kanbanColumnDndZone';

    static componentLabel = 'kanbanColumnDndZoneLabel';

    render() {
        const { className, column, children, droppableId, isStatic } = this.props;

        return (
            <Droppable direction={this.direction} droppableId={droppableId}>
                {(provided, snapshot) => {
                    const dragAndDropIsOver: boolean = !isStatic && snapshot.isDraggingOver;

                    const containerClassName = classNames(
                        {
                            dndZone: true,
                            [`dropZone--${droppableId}`]: true,
                            [styles.Container]: true,
                            DndIsOver: dragAndDropIsOver,
                            [`axisLabels--${column}`]: true,
                        },
                        className,
                    );

                    return (
                        <div className={containerClassName}>
                            <div className={styles.ScrollContainer}>
                                <div className={styles.ScrollInnerContainer}>
                                    <div
                                        ref={provided.innerRef}
                                        className={styles.InnerContainer}
                                        {...provided.droppableProps}
                                    >
                                        {children}

                                        {provided.placeholder}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Droppable>
        );
    }

    get direction(): Direction {
        if (this.props.direction == Direction.X) {
            return Direction.X;
        }

        return Direction.Y;
    }
}
