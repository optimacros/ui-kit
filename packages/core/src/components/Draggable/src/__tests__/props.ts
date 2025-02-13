import { fn } from '@storybook/test';
import { Draggable } from '..';

export const props: Draggable.DndContextProps = {
    autoScroll: true,
    onDragStart: fn(),
    onDragOver: fn(),
    onDragMove: fn(),
    onDragEnd: fn(),
    cancelDrop: fn(),
    onDragCancel: fn(),
};
