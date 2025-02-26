import { ArgTypes, StoryObj, Meta } from '@storybook/react';
import { Sidebar } from '.';
import { ComponentProps } from 'react';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Sidebar.Root>>> = {
    open: {
        description: 'Whether the collapsible is open when component is loaded',
        control: 'boolean',
        table: { defaultValue: { summary: 'false' } },
    },
    'open.controlled': {
        control: 'boolean',
        description: 'Whether the collapsible is controlled by the user',
        table: { defaultValue: { summary: 'false' } },
    },
    controllable: {
        control: 'boolean',
        description: 'Whether the component handles props update',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Callback to be invoked when the collapsible is opened or closed',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    disabled: {
        description: 'Whether the collapsible is disabled',
        control: 'boolean',
        table: { defaultValue: { summary: 'false' } },
    },
    position: {
        description: 'Sidebar position',
        control: false,
        table: { type: { summary: 'left | right' }, defaultValue: { summary: 'right' } },
    },
    width: {
        description: 'Panel width',
        control: 'object',
        table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
};

const meta: Meta<typeof Sidebar.Root> = {
    title: 'UI Kit core/Sidebar',
    component: Sidebar.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Sidebar.Root>;

export const Basic: Story = {
    args: {
        open: false,
        position: 'right',
        'open.controlled': false,
        controllable: false,
        onOpenChange: fn(),
        disabled: false,
        width: 300,
    },
    play: scenarios.basic,
    render: examples.Basic,
};

export const PositionLeft = {
    args: {
        open: false,
        position: 'left',
    },
    render: examples.Basic,
};

export const Disabled = {
    args: {
        disabled: true,
        open: false,
        position: 'right',
    },
    render: examples.Basic,
};

export const FullWidth = {
    args: {
        open: true,
        width: '100%',
    },
    render: examples.Basic,
};
