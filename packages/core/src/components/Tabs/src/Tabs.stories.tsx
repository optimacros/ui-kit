import { StoryObj, Meta, ArgTypes } from '@storybook/react';
import type { Tab } from './models';
import * as stories from './stories';
import * as scenarios from './__test__/scenarios';
import { Tabs } from '.';
import { createTabs } from './mock';

const argTypes: Partial<ArgTypes> = {
    tabs: {
        control: false,
        description: 'Set of tabs',
        table: {
            type: { summary: 'Tab[]' },
        },
    },
    value: { control: 'text', description: 'Active tab id' },
    onValueChange: {
        control: false,
        description: 'Callback called on tab (de)select',
        table: {
            type: { summary: '(newActiveTabId?: string) => void' },
        },
    },
    onPositionChange: {
        control: false,
        description: 'Callback called on tabs reorder',
        table: {
            type: { summary: '(newTabs: Tab[]) => void' },
        },
    },
    deselectable: {
        control: 'boolean',
        description: 'Whether tab can be deselected',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    variant: {
        control: 'select',
        options: ['primary', 'secondary'],
        description: 'Controls the visual style variant of the button',
        table: {
            type: { summary: 'primary | secondary' },
            defaultValue: { summary: 'primary' },
        },
    },
    orientation: {
        control: 'select',
        options: ['horizontal', 'vertical'],
        description: 'Controls the visual style variant of the button',
        table: {
            type: { summary: 'horizontal | vertical' },
            defaultValue: { summary: 'horizontal' },
        },
    },
    activationMode: {
        control: 'select',
        options: ['manual', 'automatic'],
        description:
            'The activation mode of the tabs. Can be `manual` or `automatic` - `manual`: Tabs are activated when clicked or press `enter` key. - `automatic`: Tabs are activated when receiving focus',
        table: {
            type: { summary: 'manual | automatic' },
            defaultValue: { summary: 'manual' },
        },
    },
    draggableMode: {
        control: 'select',
        options: ['ordered', 'swap'],
        description: 'Reorder all tabs or swap 2',
        table: {
            type: { summary: 'DraggableMode' },
            defaultValue: { summary: 'ordered' },
        },
    },
    draggable: {
        control: 'boolean',
        description: 'Whether tabs are draggable',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    tabsHidden: {
        control: 'boolean',
        description: 'Whether tabs are hidden',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    useWheel: {
        control: 'boolean',
        description: 'Whether wheel scroll is enabled',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
};

const meta: Meta<typeof Tabs.Root> = {
    title: 'UI Kit core/Tabs',
    component: Tabs.Root,
    argTypes,
};

export default meta;

const items: Tab[] = createTabs(20);

type Story = StoryObj<typeof Tabs.Root>;

export const Base: Story = {
    args: {
        tabs: items,
        activationMode: 'manual',
        deselectable: true,
        controllable: true,
        useWheel: true,
        variant: 'primary',
    },
    render: stories.Base,
};

export const Secondary: Story = {
    args: {
        tabs: items,
        activationMode: 'manual',
        deselectable: true,
        controllable: true,
        useWheel: true,
        variant: 'secondary',
    },
    render: stories.Base,
};

export const BaseVertical: Story = {
    args: {
        tabs: items,
        activationMode: 'manual',
        deselectable: true,
        controllable: true,
        useWheel: true,
        orientation: 'vertical',
    },
    render: stories.BaseVertical,
};

export const DraggableOrdered: Story = {
    args: {
        tabs: items,
        activationMode: 'manual',
        deselectable: true,
        controllable: true,
        useWheel: true,
        draggable: true,
        draggableMode: 'ordered',
    },
    render: stories.Draggable,
    play: scenarios.draggable,
};

//TODO: fix scroll problem
export const DraggableSwap: Story = {
    args: {
        tabs: items,
        activationMode: 'manual',
        deselectable: true,
        controllable: true,
        useWheel: true,
        draggable: true,
        draggableMode: 'swap',
    },
    render: stories.Draggable,
    play: scenarios.draggable,
};
