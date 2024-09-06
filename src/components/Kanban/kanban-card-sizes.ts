enum KanbanCardSize {
    SMALL = 0,
    MEDIUM = 1,
    BIG = 3,
}

export const isSmall = (cardSize: number) => cardSize == KanbanCardSize.SMALL
export const isMedium = (cardSize: number) => cardSize == KanbanCardSize.MEDIUM
export const isBig = (cardSize: number) => cardSize == KanbanCardSize.BIG
