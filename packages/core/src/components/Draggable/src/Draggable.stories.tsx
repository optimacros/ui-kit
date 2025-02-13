import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Draggable } from './index';
import * as scenarios from './__tests__/scenarios';
import * as stories from './stories';
import { fn } from '@storybook/test';

const argTypes: Partial<ArgTypes<Draggable.DndContextProps>> = {
    autoScroll: {
        control: 'boolean',
        description:
            'Use the optional `autoScroll` boolean prop to temporarily or permanently disable auto-scrolling for all sensors used within this `DndContext`.',
    },
    onDragStart: {
        control: false,
        description:
            'Fires when a drag event that meets the `activation constraints` for that `sensor` happens, along with the unique identifier of the draggable element that was picked up',
        table: { type: { summary: '(event: DragStartEvent) => void' } },
    },
    onDragMove: {
        control: false,
        description:
            'Fires anytime as the `draggable` item is moved. Depending on the activated `sensor`, this could for example be as the `Pointer` is moved or the `Keyboard` movement keys are pressed.',
        table: { type: { summary: '(event: DragMoveEvent) => void' } },
    },
    onDragOver: {
        control: false,
        description:
            'Fires when a `draggable` item is moved over a `droppable` container, along with the unique identifier of that droppable container.',
        table: { type: { summary: '(event: DragOverEvent) => void' } },
    },
    onDragEnd: {
        control: false,
        description:
            'Fires after a draggable item is dropped. This event contains information about the active draggable `id` along with information on whether the draggable item was dropped `over`.',
        table: { type: { summary: '(event: DragEndEvent) => void' } },
    },
    onDragCancel: {
        control: false,
        description:
            'Fires if a drag operation is cancelled, for example, if the user presses `escape` while dragging a draggable item.',
        table: { type: { summary: '() => void' } },
    },
    cancelDrop: {
        control: false,
        description: 'Validates drop',
        table: { type: { summary: '(args: DragEndEvent) => boolean | Promise<boolean>' } },
    },
};

const meta: Meta<typeof Draggable.Root> = {
    title: 'UI Kit core/Draggable',
    component: Draggable.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<Draggable.DndContextProps>;

export const Basic: Story = {
    args: {
        autoScroll: true,
        onDragStart: fn(),
        onDragOver: fn(),
        onDragMove: fn(),
        onDragEnd: fn(),
        cancelDrop: fn(),
        onDragCancel: fn(),
    },
    render: stories.Basic,
    play: scenarios.basic,
};
