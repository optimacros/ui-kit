import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { KanbanColumn } from './KanbanColumn';
import { KanbanProps } from './types';
import { SliderScale } from '../SliderScale';

import styles from './Kanban.module.css';

@observer
export class Kanban extends React.PureComponent<KanbanProps> {
    static identifier = 'kanban';

    static componentLabel = 'kanbanLabel';

    render() {
        return (
            <div className={styles.Container}>
                {this.renderSlider()}
                {/** @ts-ignore */}
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className={styles.ContainerScroll} id="scrollContainer">
                        <div className={styles.ContainerScrollContent}>{this.renderKanban()}</div>
                    </div>
                </DragDropContext>
            </div>
        );
    }

    private renderSlider() {
        const { maxSizeCard, currentSizeCard } = this.props;

        return (
            <div className={styles.Resizer}>
                <span className={styles.ResizerLabel}>S</span>

                <div className={styles.ResizerScale}>
                    <SliderScale
                        max={maxSizeCard}
                        min={0}
                        step={1}
                        theme={styles}
                        value={currentSizeCard}
                        pinned
                        snaps
                        onChange={this.onResizeCard}
                    />
                </div>

                <span className={styles.ResizerLabel}>XL</span>
            </div>
        );
    }

    private renderKanban() {
        return (
            <React.Fragment>
                <div className={styles.Status}>
                    <div className={styles.Row}>{this.renderStatuses()}</div>
                </div>

                {this.renderColumn()}
            </React.Fragment>
        );
    }

    private renderStatuses() {
        const { statuses } = this.props;

        return _.map(statuses, (element) => (
            <div key={element.id} className={styles.Col}>
                <div className={styles.StatusItem}>{element.name}</div>
            </div>
        ));
    }

    private renderColumn() {
        const {
            columns,
            cards,
            currentSizeCard,
            statuses,
            isCardUpdating,
            toggleColumnVisibility,
        } = this.props;

        return _.map(columns, (element) => {
            return (
                <KanbanColumn
                    key={element.id}
                    cards={cards}
                    column={element}
                    currentSizeCard={currentSizeCard}
                    isCardUpdating={isCardUpdating}
                    statuses={statuses}
                    toggleColumnVisibility={toggleColumnVisibility}
                />
            );
        });
    }

    private onResizeCard: KanbanProps['changeCardSize'] = (value) => {
        this.props.changeCardSize(value);
    };

    private onDragEnd: KanbanProps['onDragEnd'] = (payload) => {
        this.props.onDragEnd(payload);
    };
}
