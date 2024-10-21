import { DragUpdate } from 'react-beautiful-dnd'

export interface KanbanProps {
    isCardUpdating: boolean

    maxSizeCard: number
    currentSizeCard: number

    columns: KanbanColumn[]
    cards: KanbanCard[]
    statuses: KanbanStatus[]

    toggleColumnVisibility: (id: KanbanColumn['id']) => void
    changeCardSize: (cardSize: KanbanProps['currentSizeCard']) => void
    onDragEnd: (payload: DragUpdate) => void
}

export interface KanbanColumn {
    name: string
    id: number
    headerEntityName: string | null
    headerLabel: string
    visible: boolean
}

export interface KanbanCard {
    id: number
    hash: string
    columnId: number
    statusId: number
    position: {
        row: number
        col: number
    }
}

export interface KanbanStatus {
    id: number
    name: string
    position: number
}
