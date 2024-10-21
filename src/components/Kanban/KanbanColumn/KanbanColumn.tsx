import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'
import { Icon } from 'ui-kit-core'

import { isBig, isSmall } from '../kanban-card-sizes'
import { KanbanColumnCard } from '../KanbanColumnCard'
import { KanbanColumnDndZone } from '../KanbanColumnDndZone'
import { KanbanColumn as IKanbanColumn, KanbanProps, KanbanStatus } from '../types'

import styles from './KanbanColumn.module.css'

type PickKanbanProps = Pick<
    KanbanProps,
    'cards' | 'statuses' | 'toggleColumnVisibility' | 'currentSizeCard' | 'isCardUpdating'
>

type Props = PickKanbanProps & {
    column: IKanbanColumn
}

@observer
export class KanbanColumn extends React.PureComponent<Props> {
    static identifier = 'kanbanColumn'

    static componentLabel = 'kanbanColumnLabel'

    render() {
        const { currentSizeCard, column } = this.props

        const classNameArrow = classNames({
            [styles.ColumnTitleIconArrow]: true,
            [styles.ColumnTitleIconArrow_rotate]: !this.visible,
        })

        const classNameColumnTitle = classNames({
            [styles.ColumnTitle]: true,
            [styles.ColumnTitle_small]: isSmall(currentSizeCard),
            [styles.ColumnTitle_big]: isBig(currentSizeCard),
        })

        return (
            <div className={styles.ColumnContainer}>
                <div
                    className={classNameColumnTitle}
                    onClick={this.onClickTitle}
                >
                    <Icon
                        className={classNameArrow}
                        name="arrow_drop_down"
                    />

                    {column.name}
                </div>

                <div className={styles.ColumnCards}>{this.renderColumn()}</div>
            </div>
        )
    }

    private renderColumn() {
        const { currentSizeCard, column, statuses } = this.props

        if (!this.visible) {
            return null
        }

        return _.map(statuses, (status) => {
            const classNameStatusDropZone = classNames({
                [styles.StatusDropZone]: true,
                [styles.StatusDropZone_small]: isSmall(currentSizeCard),
            })

            const key = `${status.id}:${column.id}`
            const keyColumn = `${status.name}:${column.headerLabel}`

            return (
                <KanbanColumnDndZone
                    key={key}
                    className={classNameStatusDropZone}
                    column={keyColumn}
                    droppableId={key}
                >
                    {this.renderCards(status)}
                </KanbanColumnDndZone>
            )
        })
    }

    private renderCards(status: KanbanStatus) {
        const { cards, column, currentSizeCard, isCardUpdating } = this.props

        const columnCards = cards.filter((card) => {
            const sameStatus = () => card.statusId === status.id
            const sameId = () => card.columnId === column.id

            return sameStatus() && sameId()
        })

        return columnCards.map(({ id, hash }, index) => {
            return (
                <KanbanColumnCard
                    key={id}
                    currentSizeCard={currentSizeCard}
                    draggableId={`${id}:${index}`}
                    index={index}
                    isCardUpdating={isCardUpdating}
                    value={hash}
                />
            )
        })
    }

    private onClickTitle = () => {
        this.props.toggleColumnVisibility(this.props.column.id)
    }

    private get visible() {
        return this.props.column.visible
    }
}
