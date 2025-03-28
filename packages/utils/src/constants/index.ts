export enum Orientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type OrientationString = Orientation.Horizontal | Orientation.Vertical;

export enum Align {
    Left = 'left',
    Right = 'right',
    Center = 'center',
    RightInRow = 'rightInRow',
}

export const KEY_CODES = {
    SPACE: 32,
    ESC: 27,
    ENTER: 13,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
};
