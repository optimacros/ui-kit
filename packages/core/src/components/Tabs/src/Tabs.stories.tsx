import { StoryObj, Meta, ArgTypes } from '@storybook/react';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { Tabs } from '.';
import { tabs } from './mock';

const argTypes: Partial<ArgTypes> = {
    tabs: {
        control: false,
        description: 'Set of tabs',
        table: {
            type: { summary: 'Tab[]' },
        },
        type: { name: 'array', required: true, value: null },
    },
    value: {
        control: 'text',
        description: 'Active tab id',
        type: { name: 'string', required: true },
    },
    onValueChange: {
        control: false,
        description: 'Callback called on tab (de)select',
        table: {
            type: { summary: '(newActiveTabId?: string) => void' },
        },
        type: { name: 'function', required: true },
    },
    onPositionChange: {
        control: false,
        description: 'Callback called on tabs reorder',
        table: {
            type: { summary: '(newTabs: Tab[]) => void' },
        },
    },
    activationMode: {
        control: 'select',
        options: ['manual', 'automatic'],
        description:
            'The activation mode of the tabs. Can be `manual` or `automatic` - `manual`: Tabs are activated when clicked or press `enter` key. - `automatic`: Tabs are activated when receiving focus',
        table: {
            type: { summary: 'manual | automatic' },
            defaultValue: { summary: 'automatic' },
        },
    },
    loopFocus: {
        control: 'boolean',
        description:
            'Whether the keyboard navigation will loop from last tab to first, and vice versa',
        table: {
            defaultValue: { summary: 'true' },
        },
    },
    deselectable: {
        control: 'boolean',
        description: 'Whether tab can be deselected',
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
    draggable: {
        control: 'boolean',
        description:
            'Whether tabs are draggable. `onTabsChange` should be provided and `tabs` must be updated',
        table: {
            defaultValue: { summary: 'false' },
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
};

const meta: Meta<typeof Tabs.Root> = {
    title: 'UI Kit core/Tabs',
    component: Tabs.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Tabs.Root>;

export const Base: Story = {
    args: {
        tabs: tabs,
        value: tabs[0].id,
        activationMode: 'manual',
        loopFocus: true,
        deselectable: true,
        useWheel: true,
        tabsHidden: true,
    },
    render: stories.Base,
};

export const BaseAllContentRendered: Story = {
    args: {
        tabs: tabs,
        value: tabs[0].id,
        activationMode: 'manual',
        loopFocus: true,
        deselectable: true,
        useWheel: true,
        tabsHidden: true,
    },
    render: stories.BaseAllContentRendered,
};

export const VariantSecondary: Story = {
    args: {
        tabs: tabs,
        value: tabs[0].id,
        variant: 'secondary',
    },
    render: stories.Base,
};

export const BaseVertical: Story = {
    args: {
        tabs: tabs,
        value: tabs[0].id,
        orientation: 'vertical',
    },
    render: stories.BaseVertical,
};

export const DraggableOrdered: Story = {
    args: {
        tabs: tabs,
        value: tabs[0].id,
        draggable: true,
        draggableMode: 'ordered',
    },
    render: stories.Draggable,
    play: scenarios.draggable,
};

export const DraggableSwap: Story = {
    args: {
        tabs: tabs,
        value: tabs[0].id,
        draggable: true,
        draggableMode: 'swap',
    },
    render: stories.Draggable,
    play: scenarios.draggable,
};
